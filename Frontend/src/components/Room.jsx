import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import { useSocket } from "../context/SocketProvider";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from "react-icons/fa";
import "./Room.css";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    if (myStream) {
      // Explicitly add audio tracks first
      myStream.getAudioTracks().forEach(track => {
        console.log("Adding audio track to peer connection");
        peer.peer.addTrack(track, myStream);
      });
      
      // Then add video tracks
      myStream.getVideoTracks().forEach(track => {
        console.log("Adding video track to peer connection");
        peer.peer.addTrack(track, myStream);
      });
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    const handleTrack = async (ev) => {
      if (ev.streams && ev.streams.length > 0) {
        console.log("Received track - kind:", ev.track.kind, "enabled:", ev.track.enabled);
        const newRemoteStream = new MediaStream();
        
        // Add all tracks from all streams
        ev.streams.forEach(stream => {
          stream.getTracks().forEach(track => {
            console.log(`Adding ${track.kind} track to remote stream`);
            newRemoteStream.addTrack(track);
          });
        });

        // Verify audio tracks
        const audioTracks = newRemoteStream.getAudioTracks();
        console.log("Remote stream audio tracks:", audioTracks.length);
        if (audioTracks.length > 0) {
          audioTracks[0].enabled = true;
          console.log("Audio track enabled state:", audioTracks[0].enabled);
        }

        setRemoteStream(newRemoteStream);
      }
    };

    peer.peer.addEventListener("track", handleTrack);
    return () => {
      peer.peer.removeEventListener("track", handleTrack);
    };
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  // Handle Call Cut
  const handleCallCut = () => {
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
      setMyStream(null);
      setRemoteStream(null);
      setRemoteSocketId(null);
    }
  };

  // Toggle Mic
  const toggleMic = () => {
    if (myStream) {
      const audioTrack = myStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMicOn(audioTrack.enabled);
      }
    }
  };

  // Toggle Camera
  const toggleCamera = () => {
    if (myStream) {
      const videoTrack = myStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setCameraOn(videoTrack.enabled);
      }
    }
  };

  return (
    <div className="room-container1">
      <div className="room-header">
        <h1>Room Page</h1>
        <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
      </div>
      <div className="room-ads">{myStream && <button className="send-strem" onClick={sendStreams}>Send Stream</button>}
      {remoteSocketId && <button className="call" onClick={handleCallUser}>CALL</button>}</div>
      
      <div className="stream-container">
        {myStream && (
          <div className="stream">
            <h1>My Stream</h1>
            <ReactPlayer
              playing
              muted
              height="117px"
              width="175px"
              object-fit="cover"
              url={myStream}
            />
          </div>
        )}
        {remoteStream && (
          <div className="stream">
            <h1>Remote Stream</h1>
            <ReactPlayer
              playing
              muted={false}  // Ensure audio is not muted
              height="100%"
              width="100%"
              object-fit="cover"
              url={remoteStream}
              onError={(e) => console.error("ReactPlayer error:", e)}
              config={{
                file: {
                  attributes: {
                    autoPlay: true,
                    playsInline: true,
                  },
                },
              }}
            />
          </div>
        )}
      </div>
      {myStream && (
        <div className="controls">
          <button className="mic" onClick={toggleMic}>
            {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
          </button>
          <button className="video" onClick={toggleCamera}>
            {cameraOn ? <FaVideo /> : <FaVideoSlash />}
          </button>
          <button className="end-call" onClick={handleCallCut}>
            <FaPhoneSlash />
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomPage;