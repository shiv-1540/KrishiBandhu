import React, { useState, useEffect } from "react";
import drip from "../innoverse/drip.jpeg";
import rotation from "../innoverse/rotation.webp";
import hydrophonics from "../innoverse/hydrophonics.jpg";
import vertical from "../innoverse/vertical.jpeg";
import aerophonics from "../innoverse/aerophonics.jpg";
import aquaponics from "../innoverse/aquaponics.jpg";
import mulching from "../innoverse/mulching.jpg";
import greenhouse from "../innoverse/grreenhouse.jpg";
import precision from "../innoverse/precision.jpg";
import agro from "../innoverse/argo.jpg";
import permaculture from "../innoverse/permaculture.jpg";
import notill from "../innoverse/notill.jpg";

import '@fortawesome/fontawesome-free/css/all.min.css';

const farmingTechniques = [
  {
    id: 1,
    title: { 
      en: "Drip Irrigation", 
      mr: "ठिबक सिंचन" 
    },
    description: { 
      en: "A method that saves water and nutrients.", 
      mr: "पाणी आणि पोषकतत्त्वे वाचवण्याची पद्धत." 
    },
    fullText: {
      en: `Drip irrigation is a highly efficient method of watering crops that delivers water directly to plant roots through pipes, valves, drippers, and emitters. Unlike traditional irrigation methods, it ensures minimal water wastage, reduces soil erosion, and promotes healthier plant growth. 
  
  Planning the system involves designing based on crop type, soil, and field size. Sandy soil needs more frequent watering than clay. A good filtration system is important to prevent clogging.
  
  Mainline and sub-main pipes distribute water throughout the field. Drip tubes laid along rows slowly release water at the roots. Drippers can be inline or online, providing a slow and steady supply.
  
  Automation like timers and moisture sensors helps conserve water and reduces labor. Regular maintenance includes checking for blockages or leaks.
  
  Drip irrigation helps save water, reduce weeds, and improve plant health. It is ideal for dry regions and supports sustainable farming.`,
      
      mr: `ठिबक सिंचन ही एक अत्यंत कार्यक्षम सिंचन पद्धत आहे जी पाईप्स, झडपा, ठिबक आणि उत्सर्जकांच्या माध्यमातून पाणी थेट मुळांपर्यंत पोहोचवते. पारंपरिक पद्धतींच्या तुलनेत, ही पद्धत पाण्याचा अपव्यय कमी करते, मातीची धूप टाळते आणि पिकांची वाढ सुधारते.
  
  सिस्टमचे नियोजन पिकाचा प्रकार, माती आणि शेताच्या आकारानुसार केले जाते. वाळवंटातील मातीला वारंवार पाणी लागते तर चिकणमाती पाणी टिकवते. झाडांना अडथळा येऊ नये म्हणून योग्य फिल्टर लावणे आवश्यक असते.
  
  मुख्य आणि उप-मुख्य पाइप्सद्वारे पाणी शेतात वितरित केले जाते. रोपांच्या रांगा सोबत ठिबक नळ्या लावल्या जातात, ज्या पाणी हळूहळू मुळांपर्यंत पोहोचवतात.
  
  टायमर आणि सेन्सर्सचा वापर केल्यास पाणी बचत होते आणि मजुरीही कमी लागते. नियमित देखभाल केल्याने कार्यक्षमता टिकते.
  
  ठिबक सिंचन पाणी वाचवते, तण कमी करते आणि पिकांची आरोग्य सुधारते. ही पद्धत कोरड्या भागांसाठी उपयुक्त असून शाश्वत शेतीला चालना देते.`
    },
    marathiDescription: "ठिबक सिंचन पाणी वाचवते आणि पिकांसाठी फायदेशीर ठरते.",
    videoUrl: "https://www.youtube.com/embed/uDBB7EzVD_M",
    imageUrl: drip
  },  
  {
    id: 2,
    title: {
      en: "Crop Rotation",
      mr: "पीक फेरपालट"
    },
    description: {
      en: "A technique to improve soil health and prevent pests.",
      mr: "मातीची सुपीकता वाढवण्यासाठी आणि कीड टाळण्यासाठी एक तंत्र."
    },
    fullText: {
      en: `Crop rotation is a farming method where different crops are grown in the same field in a planned sequence across seasons. It helps improve soil fertility, reduce pests and diseases, and enhance crop yields. Unlike monocropping, it restores nutrients by alternating crop types.
  
  Crops are chosen based on their nutrient needs—like legumes, cereals, root crops, and leafy vegetables. A rotation may involve nitrogen-fixing legumes one season, followed by cereals, then root or leafy crops.
  
  One major benefit is natural nitrogen replenishment by legumes, which reduces fertilizer use. Crop rotation also disrupts the life cycle of pests and diseases by removing their host plants, lowering pesticide dependence.
  
  Root diversity improves soil structure and moisture retention. Deep roots break hard soil layers, while shallow ones reduce erosion. It also supports biodiversity, encouraging helpful insects and microbes.
  
  Crop rotation is simple yet powerful for sustaining soil health and increasing resilience to climate challenges. It’s a key part of sustainable agriculture.`,
      
      mr: `पीक फेरपालट ही अशी शेती पद्धत आहे ज्यामध्ये विविध पीके नियोजित क्रमाने एका शेतात पाळीने घेतली जातात. यामुळे मातीची सुपीकता वाढते, कीड आणि रोगांचे प्रमाण कमी होते आणि उत्पादनात वाढ होते. ही पद्धत एकाच पीक वारंवार घेण्याऐवजी जमिनीतील पोषकतत्त्वांची समतोल पुनर्निर्मिती करते.
  
  पीक फेरपालटीसाठी डाळी, धान्य, मुळपीके आणि पाने खाल्ली जाणारी भाजीपाला अशी वर्गवारी केली जाते. एका हंगामात डाळी, दुसऱ्यात धान्य, तिसऱ्यात मुळपीक अशी फेरपालट केली जाते.
  
  डाळीच्या मुळांमुळे नायट्रोजन मातीमध्ये नैसर्गिकरीत्या जमा होते, त्यामुळे रासायनिक खते कमी लागतात. तसेच, फेरपालटीमुळे कीटक व रोगांची वाढ होणारे पीक उपलब्ध राहत नाही, त्यामुळे त्यांचा प्रादुर्भाव कमी होतो.
  
  भिन्न मुळे असलेल्या पिकांमुळे मातीची रचना सुधारते आणि ओलावा टिकून राहतो. खोल मुळे माती भेदतात आणि पाण्याचा निचरा सुधारतात. या विविधतेमुळे उपयुक्त कीटक आणि जिवाणू वाढतात.
  
  पीक फेरपालट ही सोपी पण अत्यंत प्रभावी पद्धत आहे जी मातीचे आरोग्य टिकवते आणि हवामानातील बदलांशी सामना करण्यास मदत करते.`
    },
    marathiDescription: "पीक फेरपालट मातीची सुपीकता राखण्यास मदत करते.",
    videoUrl: "https://www.youtube.com/embed/OjqF7Jtmo4w",
    imageUrl: rotation
  },
  {
    id: 3,
    title: {
      en: "Hydroponics",
      mr: "हायड्रोपोनिक्स"
    },
    description: {
      en: "Soil-less farming with water-based nutrient solutions.",
      mr: "पोषणयुक्त पाण्यावर आधारित मातीविरहित शेती."
    },
    fullText: {
      en: `Hydroponics is a modern farming method where plants grow without soil by using water-based nutrient solutions. It delivers essential minerals directly to the roots, promoting faster growth and higher yields.
  
  This method controls environmental factors like light, temperature, and nutrient levels, making it ideal for areas with poor soil, limited land, or water scarcity. Nutrient solutions contain elements like nitrogen, phosphorus, and potassium in readily absorbable form.
  
  Various hydroponic systems exist: NFT (nutrient film technique), DWC (deep water culture), Ebb and Flow, Drip, and Aeroponics. These methods differ in how they deliver nutrients and oxygen to the roots.
  
  Hydroponics uses up to 90% less water than traditional farming by recirculating nutrients, making it suitable for drought-prone or urban areas. It also allows vertical farming, maximizing space and enabling food production in cities.
  
  Since there's no soil, issues with soil-borne pests and diseases are eliminated, reducing the need for chemical pesticides. Controlled environments also protect crops from weather fluctuations and allow year-round farming.
  
  Though the setup can be costly and needs technical knowledge, hydroponics is an efficient, sustainable solution for the future of farming.`,
  
      mr: `हायड्रोपोनिक्स ही एक आधुनिक शेती पद्धत आहे जिथे मातीऐवजी पोषणयुक्त पाण्याचा वापर करून झाडे उगम पावतात. झाडांना आवश्यक खनिजे थेट मुळांद्वारे दिली जातात, ज्यामुळे वाढ जलद होते आणि उत्पादन वाढते.
  
  या पद्धतीत प्रकाश, तापमान आणि पोषणाची पातळी नियंत्रित करता येते, त्यामुळे ती खराब माती, पाण्याची कमतरता किंवा मर्यादित जागा असलेल्या भागांसाठी उपयुक्त आहे. पोषण द्राव्यामध्ये नायट्रोजन, फॉस्फरस आणि पोटॅशियमसारखी मूलद्रव्ये समाविष्ट असतात.
  
  हायड्रोपोनिक्सचे विविध प्रकार आहेत: एनएफटी, डीडब्ल्यूसी, एब अँड फ्लो, ड्रिप आणि एरोपोनिक्स. प्रत्येक प्रणाली झाडांच्या मुळांपर्यंत पोषण व ऑक्सिजन पोहोचवण्याची वेगळी पद्धत वापरते.
  
  पारंपरिक शेतीच्या तुलनेत ९०% पर्यंत कमी पाणी लागते कारण पोषण द्राव्य पुन्हा वापरले जाते. त्यामुळे ही पद्धत दुष्काळग्रस्त आणि शहरी भागांसाठी उपयुक्त आहे. जागा कमी लागते आणि उभी शेतीही शक्य होते.
  
  माती नसल्याने कीटक व रोगांचा धोका कमी होतो आणि रासायनिक फवारणीची गरज कमी भासते. नियंत्रित वातावरणामुळे पीक वर्षभर घेतले जाऊ शकते.
  
  यंत्रणा थोडी महाग आणि तांत्रिक ज्ञान आवश्यक असले तरी हायड्रोपोनिक्स ही एक टिकाऊ आणि कार्यक्षम शेती पद्धत आहे.`    
    },
    marathiDescription: "हायड्रोपोनिक्समध्ये मातीऐवजी पोषणयुक्त पाण्याचा वापर होतो.",
    videoUrl: "https://www.youtube.com/embed/3AXqC1dCaHM",
    imageUrl: hydrophonics
  },
  
  {
    id: 4,
    title: {
      en: "Vertical Farming",
      mr: "ऊर्ध्व शेती"
    },
    description: {
      en: "Maximizes space efficiency using stacked layers.",
      mr: "स्तरित रचनेचा वापर करून जागेचा जास्तीत जास्त वापर."
    },
    fullText: {
      en: `Vertical farming is a technique where crops are grown in stacked layers or vertical structures, making it ideal for urban areas with limited land. This method maximizes space, reduces resource use, and enables year-round crop production.
  
  By using technologies like hydroponics and aeroponics, vertical farms grow crops without soil and with up to 90% less water than traditional farming. These systems deliver nutrients directly to plant roots and operate in enclosed environments, protecting crops from weather and pests.
  
  Crops can be grown in warehouses, containers, or skyscrapers, reducing transportation needs and carbon emissions. LED lights provide the necessary light for growth, while water is recycled to minimize waste.
  
  Since vertical farms are indoors and pest-free, there's little to no need for pesticides, resulting in cleaner produce. Urban vertical farms bring fresh food closer to consumers and make cities more self-reliant.
  
  While setup costs and energy use can be high, especially for lighting and climate control, advances in renewable energy are making vertical farming more sustainable. Though not suitable for all crops, it is a promising solution for food security in cities.`,
  
      mr: `ऊर्ध्व शेती म्हणजे पीक उभ्या थरांमध्ये किंवा संरचनेत उगम पावतात, ज्यामुळे ती शहरांमध्ये मर्यादित जागेसाठी उपयुक्त ठरते. ही पद्धत जागेचा अधिक चांगला वापर करते आणि वर्षभर पीक उत्पादन शक्य करते.
  
  हायड्रोपोनिक्स आणि एरोपोनिक्स वापरून मातीशिवाय पीक घेतले जाते आणि पारंपरिक शेतीपेक्षा ९०% कमी पाणी लागते. पोषण थेट मुळांपर्यंत दिले जाते आणि बंद वातावरणामुळे हवामान आणि कीटकांचा त्रास होत नाही.
  
  ही शेती कंटेनर, गोडाऊन किंवा इमारतीत करता येते, ज्यामुळे वाहतूक खर्च आणि कार्बन उत्सर्जन कमी होते. एलईडी लाइट्स झाडांना आवश्यक प्रकाश देतात आणि पाणी पुन्हा वापरले जाते.
  
  या पद्धतीत कीटकांचा त्रास कमी असल्याने रासायनिक फवारणीची गरज राहत नाही, त्यामुळे अन्न स्वच्छ आणि सुरक्षित असते. ही शेती शहरांना अन्न उत्पादनात आत्मनिर्भर बनवते.
  
  जरी सुरुवातीचा खर्च आणि वीज वापर जास्त असला तरी नवीकरणीय ऊर्जेमुळे ऊर्ध्व शेती अधिक शाश्वत ठरत आहे. सर्व पीक यासाठी योग्य नसले तरी शहरांमधील अन्न सुरक्षेसाठी ही एक आशादायक पद्धत आहे.`  
    },
    marathiDescription: "ऊर्ध्व शेती जागेचा जास्तीत जास्त वापर करते.",
    videoUrl: "https://www.youtube.com/embed/PpyUQ3I5qUA",
    imageUrl: vertical
  },
  {
    id: 5,
    title: {
      en: "Aeroponics",
      mr: "एरोपोनिक्स"
    },
    description: {
      en: "Growing plants in air with nutrient mist.",
      mr: "हवेत पोषणयुक्त धुक्याद्वारे पिके वाढवण्याची पद्धत."
    },
    fullText: {
      en: `Aeroponics is a method of growing plants without soil, where roots are suspended in air and misted with a nutrient-rich solution. This system provides excellent oxygenation and ensures plants receive water and nutrients directly.
  
  In a controlled environment, the misting system delivers nutrients at regular intervals, promoting fast growth and reducing water use by up to 95%. Since there's no soil, the risk of soil-borne pests and diseases is eliminated, reducing the need for pesticides.
  
  Aeroponics supports vertical farming, allowing more food production in small spaces—ideal for cities. The setup also enables year-round cultivation since temperature, humidity, and light can be optimized.
  
  This method reduces environmental impact by preventing soil degradation and chemical pollution. However, it requires careful monitoring and consistent electricity to avoid system failures, which could quickly affect plant health.
  
  In conclusion, aeroponics offers a sustainable, high-efficiency way to grow crops. It’s an ideal solution for areas with limited water or space, and holds great potential for future urban and climate-resilient agriculture.`,
  
      mr: `एरोपोनिक्स ही मातीशिवाय शेती करण्याची आधुनिक पद्धत आहे, ज्यामध्ये पिकांच्या मुळांना पोषणयुक्त धुके फवारले जाते. या पद्धतीत झाडांच्या मुळांना भरपूर ऑक्सिजन मिळतो आणि पोषण थेट मिळते.
  
  नियंत्रित वातावरणात, मुळांवर ठराविक वेळाने पोषणयुक्त पाण्याची फवारणी होते, ज्यामुळे पिकांची वाढ जलद होते आणि पाण्याचा वापर ९५% पर्यंत कमी होतो. माती नसल्यामुळे कीटक व रोगांचा धोका कमी होतो आणि फवारणीची गरजही कमी पडते.
  
  ही पद्धत उभ्या शेतीसाठी उपयुक्त आहे आणि मर्यादित जागेत अधिक अन्न उत्पादन शक्य करते. हवामान, तापमान आणि प्रकाश नियंत्रित करता येत असल्यामुळे वर्षभर पीक घेता येते.
  
  एरोपोनिक्समुळे मातीचा ऱ्हास आणि रासायनिक प्रदूषण कमी होते. मात्र, या पद्धतीत उपकरणे सतत चालू ठेवावी लागतात, कारण काही बिघाड झाल्यास पिकांचे नुकसान होऊ शकते.
  
  एरोपोनिक्स ही शाश्वत आणि कार्यक्षम पद्धत असून भविष्यातील अन्न सुरक्षेसाठी महत्त्वाची ठरू शकते, विशेषतः शहरी आणि पाण्याअभावी भागांमध्ये.`  
    },
    marathiDescription: "एरोपोनिक्समध्ये पिकांना पोषणयुक्त फवारणीद्वारे वाढवले जाते.",
    videoUrl: "https://youtube.com/embed/HlxFrfAERZk",
    imageUrl: aerophonics
  },
  {
    id: 6,
    title: {
      en: "Aquaponics",
      mr: "अक्वापोनिक्स"
    },
    description: {
      en: "Combining fish farming with plant cultivation.",
      mr: "मासेपालन आणि वनस्पती लागवडीचे एकत्रित तंत्र."
    },
    fullText: {
      en: `Aquaponics is a sustainable farming system that combines fish farming (aquaculture) with soil-less plant cultivation (hydroponics). In this closed-loop system, fish waste provides nutrients for plants, while plants filter and clean the water for the fish.
  
  The system has three main components: a fish tank, a biofilter, and a plant grow bed. Fish produce waste rich in ammonia, which is converted by beneficial bacteria into nitrates—essential nutrients for plant growth. The plants absorb these nutrients, cleaning the water, which is then recirculated back to the fish tank.
  
  Aquaponics is highly water-efficient, using up to 95% less water than traditional farming due to continuous recycling. It supports dual production—fish for protein and plants for vitamins—making it ideal for sustainable food systems.
  
  Since the system is organic and chemical-free, it eliminates the need for synthetic fertilizers and pesticides. Its compact design supports vertical farming, making it perfect for urban spaces and areas with limited arable land.
  
  However, aquaponics requires technical know-how and a higher initial investment. System failures like pump breakdowns or fish disease can affect both components, and regular monitoring of water quality and system balance is essential. Power dependency is another consideration, especially in indoor or off-grid setups.
  
  In conclusion, aquaponics offers a clean, efficient, and eco-friendly method of growing food by reusing water and nutrients in a self-sustaining loop. With proper planning and care, it holds great promise for the future of urban and sustainable agriculture.`,
  
      mr: `अक्वापोनिक्स ही शाश्वत शेतीची पद्धत आहे, ज्यामध्ये मासेपालन आणि मातीविना वनस्पती लागवड यांचे एकत्रीकरण होते. मास्यांच्या मलमूत्रातून तयार होणाऱ्या पोषणद्रव्यांचा वापर वनस्पती वाढीसाठी होतो, आणि वनस्पती पाण्याचे शुद्धीकरण करतात.
  
  या प्रणालीमध्ये तीन मुख्य घटक असतात: मासे टाकी, बायोफिल्टर आणि वनस्पती वाढवण्याचा पलंग. मासे ज्या पद्धतीने मलमूत्र सोडतात त्यातून अमोनिया तयार होतो, जो नायट्रेटमध्ये रूपांतरित होऊन वनस्पतींसाठी पोषणद्रव्य बनतो.
  
  या पद्धतीत पाण्याचा सतत पुनर्वापर होत असल्यामुळे ९५% पर्यंत पाण्याची बचत होते. एकाच वेळी मासे आणि पिके मिळवता येतात, ज्यामुळे अन्नात प्रथिने आणि पोषकतत्त्वे दोन्ही मिळतात.
  
  अक्वापोनिक्समध्ये रासायनिक खतांचा वापर नसतो, आणि ही पद्धत मोकळ्या जागेच्या अभावातही लागू करता येते. ही शहरी शेतीसाठी अत्यंत उपयुक्त आहे.
  
  तथापि, या पद्धतीसाठी तांत्रिक ज्ञान आवश्यक आहे आणि सुरुवातीला जास्त खर्च येतो. प्रणालीतील कुठलीही अडचण संपूर्ण शेतीवर परिणाम करू शकते, आणि नियमित देखभाल आवश्यक आहे. वीजेवरही याचे अवलंबन असते.
  
  एकूणच, अक्वापोनिक्स ही एक शाश्वत, पर्यावरणपूरक शेतीची पद्धत आहे, जी भविष्यात अन्नसुरक्षेसाठी प्रभावी ठरू शकते.`  
    },
    marathiDescription: "अक्वापोनिक्समध्ये मासेपालन व वनस्पती लागवड एकत्रित केली जाते.",
    videoUrl: "https://youtube.com/embed/uWgvCvAz7PI",
    imageUrl: aquaponics
  },
  {
    id: 7,
    title: {
      en: "Mulching",
      mr: "मल्चिंग"
    },
    description: {
      en: "Covering soil to retain moisture and reduce weeds.",
      mr: "मातीवर आच्छादन करून आर्द्रता टिकवते आणि तणांचा त्रास कमी करते."
    },
    fullText: {
      en: `Mulching is a farming technique where a layer of material is spread over soil to retain moisture, control temperature, suppress weeds, and improve soil health. It creates a barrier that reduces evaporation and protects plant roots from extreme temperatures.
  
  There are two types of mulch: organic (straw, leaves, wood chips, compost) and inorganic (plastic sheets, fabric). Organic mulch decomposes, enriching the soil and boosting microbial activity. Inorganic mulch is long-lasting and effective at preventing weeds and erosion, making it popular in commercial agriculture.
  
  Mulching suppresses weeds by blocking sunlight, reducing the need for herbicides. It also prevents soil erosion, improves water retention, and reduces plant diseases by keeping crops off the soil. This helps in conserving water, especially in dry areas, and allows better root growth due to improved aeration and less soil compaction.
  
  However, there are some challenges. Organic mulch breaks down and needs to be replaced regularly, while plastic mulch can contribute to pollution if not managed properly. Improper use may also attract pests or cause moisture buildup.
  
  In summary, mulching is a practical and eco-friendly method to support plant growth. When used correctly, it enhances crop productivity, conserves water, and contributes to healthier soil—making it a key tool in sustainable agriculture.`,
  
      mr: `मल्चिंग ही शेतीतील एक महत्त्वाची पद्धत आहे, ज्यामध्ये मातीवर आच्छादन करून आर्द्रता टिकवली जाते, तणांचा नाश होतो आणि मातीचे आरोग्य सुधारते. ही पद्धत मातीचे तापमान नियंत्रित करते आणि वनस्पतींच्या मुळांना संरक्षण देते.
  
  मल्चिंगचे दोन प्रकार आहेत: सेंद्रिय (गवत, पालापाचोळा, लाकडाची भुसी) आणि असेंद्रिय (प्लास्टिक शीट्स, फॅब्रिक). सेंद्रिय मल्च मातीला पोषण देते, तर असेंद्रिय मल्च तण रोखण्यात आणि मातीची धूप टाळण्यात प्रभावी असते.
  
  मल्चिंग तण उगम थांबवते, पाणी वाचवते आणि झाडांना रोगांपासून संरक्षण देते. त्यामुळे कमी सिंचनाची गरज भासते आणि मुळे मोकळेपणाने वाढू शकतात.
  
  तथापि, काही अडचणी आहेत. सेंद्रिय मल्च नष्ट होतो व पुन्हा टाकावा लागतो, आणि प्लास्टिक मल्च नीट वापरला नाही तर पर्यावरणाला धोका होतो. काही वेळा कीटकही वाढू शकतात.
  
  एकूणच, मल्चिंग ही पाण्याची बचत करणारी, माती वाचवणारी आणि पिकांचे उत्पादन वाढवणारी शाश्वत शेतीची पद्धत आहे.`  
    },
    marathiDescription: "मल्चिंग मातीचे आर्द्रता टिकवून ठेवण्यास मदत करते.",
    videoUrl: "https://youtube.com/embed/v6Lx-Xrn3A8",
    imageUrl: mulching
  },
  {
    id: 8,
    title: {
      en: "Greenhouse Farming",
      mr: "हरितगृह शेती"
    },
    description: {
      en: "Growing crops in a controlled environment.",
      mr: "नियंत्रित वातावरणात पिके वाढवण्याची पद्धत."
    },
    fullText: {
      en: `Greenhouse farming is a method of growing crops in a controlled environment to optimize plant growth and productivity. It involves managing light, temperature, humidity, and nutrients to create ideal conditions year-round.
  
  The process begins with choosing a sun-rich location and constructing the greenhouse using transparent materials like glass or plastic. Ventilation, climate control systems, and shading nets are installed to regulate internal conditions. Depending on the setup, farmers may use soil or soilless media like hydroponics or cocopeat.
  
  Climate control is key—heaters, fans, and misting systems maintain stable temperatures and humidity. Grow lights or CO₂ enrichment can be added to enhance photosynthesis and plant growth.
  
  Common greenhouse crops include tomatoes, bell peppers, cucumbers, strawberries, and leafy greens. Drip irrigation and automated nutrient delivery ensure efficient water and fertilizer use. Biological pest control and hygiene practices help manage diseases and pests with minimal chemical input.
  
  Harvesting is done when crops reach maturity, followed by careful handling and storage to preserve freshness and quality.
  
  In summary, greenhouse farming allows year-round cultivation with higher yields and better resource efficiency. It offers a sustainable solution for food production, especially in regions with harsh climates or limited arable land.`,
  
      mr: `हरितगृह शेती म्हणजे नियंत्रित वातावरणात पिके उगम करणारी आधुनिक शेतीपद्धत आहे. यात प्रकाश, तापमान, आर्द्रता आणि पोषणतत्त्वे नियंत्रित करून पिकांची वाढ वाढवली जाते.
  
  सर्वप्रथम भरपूर सूर्यप्रकाश असलेले स्थान निवडले जाते आणि पारदर्शक साहित्याचा वापर करून हरितगृह बांधले जाते. हवामान नियमनासाठी वेंटिलेशन, शेड नेट्स आणि तापमान नियंत्रण यंत्रणा बसवली जातात. माती किंवा कोकोपीटसारख्या माध्यमाचा वापर केला जातो.
  
  तापमान आणि आर्द्रता नियंत्रित करण्यासाठी हीटर्स, पंखे आणि फवारणी प्रणाली वापरल्या जातात. गरजेनुसार प्रकाश व्यवस्था आणि CO₂ पूरकता दिली जाते.
  
  टोमॅटो, मिरची, काकडी, स्ट्रॉबेरी आणि पानेदार भाज्या ही हरितगृहातील प्रमुख पिके आहेत. ठिबक सिंचन आणि अन्नद्रव्य प्रणालीद्वारे अचूक पाणी व खत दिले जाते. कीटकनियंत्रणासाठी सेंद्रिय पद्धती व स्वच्छता राखली जाते.
  
  पीक तयार झाल्यावर काळजीपूर्वक काढणी आणि साठवण केली जाते.
  
  एकंदरीत, हरितगृह शेती उच्च उत्पादन, कमी संसाधन वापर आणि शाश्वत शेतीसाठी उपयुक्त उपाय आहे.`  
    },
    marathiDescription: "हरितगृह शेती नियंत्रित वातावरणात केली जाते.",
    videoUrl: "https://youtube.com/embed/Z1Ofl4Y_8Fw",
    imageUrl: greenhouse
  },
  
  {
    id: 9,
    title: {
      en: "Precision Farming",
      mr: "प्रिसीजन शेती"
    },
    description: {
      en: "Using technology to optimize agricultural practices.",
      mr: "कृषी प्रक्रियेचे तंत्रज्ञानाच्या मदतीने अचूक व्यवस्थापन."
    },
    fullText: {
      en: `Precision farming uses advanced technology—like GPS, IoT sensors, drones, AI, and automation—to improve agricultural efficiency. It focuses on applying the right inputs (water, fertilizers, pesticides) at the right time and place, reducing waste and environmental harm.
  
  *Key Components of Precision Farming*  
  - *Data Collection & Mapping*: Soil testing, weather stations, drones, and satellite imagery help track field conditions in real time.  
  - *Variable Rate Technology*: Automated systems adjust seeding, irrigation, and fertilization based on soil and crop needs.  
  - *Targeted Pest Control*: AI tools and drones detect pests and diseases early, allowing site-specific pesticide application.  
  - *Remote Monitoring & Analytics*: Tools like NDVI sensors and machine learning predict yields and detect issues early.  
  - *Automation & Robotics*: GPS-enabled tractors, smart harvesters, and weeding robots reduce manual labor.  
  - *Data-Driven Decisions*: Cloud-based dashboards, blockchain traceability, and smart contracts help manage operations and supply chains efficiently.
  
  *Benefits*  
  Precision farming boosts yield, saves resources, and promotes sustainable agriculture. It makes farming more adaptive, eco-friendly, and productive—especially vital under changing climate conditions.`,
  
      mr: `प्रिसीजन शेती ही आधुनिक शेतीतंत्र आहे जी GPS, IoT सेन्सर्स, ड्रोन, AI आणि ऑटोमेशनच्या मदतीने शेती अधिक अचूक व कार्यक्षम बनवते. आवश्यकतेनुसार केवळ आवश्यक क्षेत्रात पाणी, खते व कीटकनाशके दिली जातात.
  
  *मुख्य घटक*  
  - *डेटा संकलन व नकाशे*: मातीची तपासणी, हवामान मापन, ड्रोन व सॅटेलाइटने पीक स्थितीचे निरीक्षण.  
  - *व्हेरिएबल रेट टेक्नॉलॉजी*: मातीच्या गरजेनुसार बी पेरणी, सिंचन व खतवापराचे स्वयंचलित नियोजन.  
  - *नियंत्रित कीड नियंत्रण*: AI आणि ड्रोनचा वापर करून कीटक व रोग ओळखले जातात व फक्त गरजेच्या ठिकाणी उपाय केले जातात.  
  - *पिकांचे निरीक्षण व अंदाज*: NDVI सेन्सर व मशीन लर्निंगचा वापर करून पीक आरोग्य व उत्पादनाचे पूर्वानुमान.  
  - *यंत्रसामग्री व स्वयंचलन*: GPS-चालित ट्रॅक्टर, रोबोटिक हार्वेस्टर व तणनाशक वापरणारे स्मार्ट रोबोट.  
  - *डेटावर आधारित निर्णय*: IoT डॅशबोर्ड, ब्लॉकचेन व स्मार्ट करार शेती व पुरवठा साखळी सुलभ करतात.
  
  *फायदे*  
  प्रिसीजन शेती उत्पादन वाढवते, खर्च कमी करते आणि शाश्वत शेतीस चालना देते. बदलत्या हवामानात ती अधिक प्रभावी ठरते.`  
    },
    marathiDescription: "प्रिसीजन शेती आधुनिक तंत्रज्ञानाचा वापर करून होते.",
    videoUrl:"https://youtube.com/embed/0XfFNPedsxE",
    imageUrl: precision
  },
  {
    id: 10,
    title: {
      en: "Agroforestry",
      mr: "अ‍ॅग्रोफोरेस्ट्री"
    },
    description: {
      en: "Integrating trees with crops for ecological benefits.",
      mr: "वृक्ष आणि पिकांची समाकलित शेती – निसर्गपूरक फायदा."
    },
    fullText: {
      en: `Agroforestry is a sustainable farming method that combines trees, crops, and sometimes livestock on the same land. This integration enhances biodiversity, improves soil health, prevents erosion, conserves water, and helps combat climate change.
  
  *Key Components of Agroforestry*
  
  1. *Site Selection & Land Prep*
     - Assess soil, climate, and water availability.
     - Plan layout for trees, crops, and livestock.
  
  2. *Tree Plantation*
     - Choose suitable trees: fruit-bearing, nitrogen-fixing, or timber.
     - Ensure proper spacing for sunlight and root development.
  
  3. *Crop Cultivation*
     - Grow shallow-rooted or shade-tolerant crops like legumes or leafy vegetables.
     - Use organic compost, rotate crops, and plant cover crops to preserve fertility.
  
  4. *Livestock Integration (Optional)*
     - Introduce cattle, goats, poultry, or bees.
     - Practice rotational grazing and prevent overgrazing.
  
  5. *Water & Soil Conservation*
     - Use drip irrigation and rainwater harvesting.
     - Apply mulching, contour farming, and terracing to reduce runoff and erosion.
  
  6. *Sustainable Harvesting*
     - Prune trees regularly to increase crop yield.
     - Harvest in cycles, compost residues, and store produce carefully.
  
  *Benefits*
  - *Economic*: Multiple income sources from wood, fruits, crops, and livestock.
  - *Environmental*: Carbon sequestration, biodiversity improvement, and reduced deforestation.
  
  *Conclusion*
  Agroforestry blends traditional wisdom with ecological science. It boosts productivity, strengthens climate resilience, and supports long-term farm sustainability. With proper planning and management, it offers a promising path toward food security and environmental protection.`,
  
      mr: `अ‍ॅग्रोफोरेस्ट्री ही शाश्वत शेती पद्धत आहे ज्यात झाडे, पिके आणि काही वेळा जनावरे एकत्र पाळली जातात. ही पद्धत जमिनीची सुपीकता वाढवते, जैवविविधता सुधारते, मातीचे धूप टाळते आणि हवामान बदलाचा प्रतिकार करते.
  
  *मुख्य घटक*
  
  1. *जमीन निवड व तयारी*
     - माती, हवामान व पाण्याची उपलब्धता तपासा.
     - झाडे, पिके व जनावरे यांची योग्य मांडणी करा.
  
  2. *वृक्ष लागवड*
     - फळझाडे, नायट्रोजन वाढवणारी किंवा लाकूड देणारी झाडे निवडा.
     - योग्य अंतर ठेवून लावणी करा.
  
  3. *पीक उत्पादन*
     - भाजीपाला, कडधान्ये, शेडमध्ये वाढणारी पिके लावा.
     - कंपोस्ट वापरा, पीक फेरबदल करा, व जमिनीला झाकणारी पिके लावा.
  
  4. *जनावरांची समावेश (पर्यायी)*
     - गुरे, मेंढ्या, कोंबड्या, मधमाशा पाळा.
     - जास्त चराई होऊ नये म्हणून नियंत्रित चराई करा.
  
  5. *पाणी व माती संरक्षण*
     - ठिबक सिंचन, पावसाचे पाणी साठवणे वापरा.
     - मल्चिंग, समोच्च शेती आणि टेरेस शेती पद्धती वापरा.
  
  6. *शाश्वत कापणी*
     - झाडे छाटणे, पीक वेळेवर घेणे, आणि साठवण व्यवस्थित करणे.
  
  *फायदे*
  - *आर्थिक*: लाकूड, फळे, पिके, व जनावरांपासून विविध उत्पन्न.
  - *पर्यावरणीय*: हवामान नियंत्रण, जैवविविधतेत वाढ, व जंगलांवरील ताण कमी.
  
  *निष्कर्ष*
  अ‍ॅग्रोफोरेस्ट्री ही पारंपरिक ज्ञान व आधुनिक विज्ञानाचे संयोजन आहे. ती टिकाऊ, पर्यावरणपूरक आणि उत्पादनक्षम शेतीस चालना देते.`  
    },
    marathiDescription: "अ‍ॅग्रोफोरेस्ट्री मातीची सुपीकता सुधारते आणि हवामान नियंत्रित करते.",
    imageUrl: agro
  },
  {
    id: 11,
    title: {
      en: "Permaculture Farming",
      mr: "परमाकल्चर शेती"
    },
    description: {
      en: "Sustainable farming mimicking natural ecosystems.",
      mr: "निसर्गाचे अनुकरण करणारी शाश्वत शेती पद्धत."
    },
    fullText: {
      en: `Permaculture farming is a nature-based, regenerative approach to agriculture. It creates self-sufficient systems by mimicking natural ecosystems—promoting biodiversity, healthy soil, water conservation, and minimal external inputs.
  
  *Key Steps in Permaculture Farming*
  
  1. *Land Design & Zoning*
     - Assess climate, soil, slope, and water sources.
     - Divide land into zones (Zone 0 to Zone 5) based on usage—from home gardens to wild zones.
  
  2. *Soil Regeneration*
     - Use composting, mulching, and green manure to enrich soil.
     - Apply no-till farming and companion planting (e.g., marigolds for pest control, legumes for nitrogen).
  
  3. *Water Management*
     - Harvest rainwater and use swales (shallow ditches) and contour beds to retain moisture.
     - Recycle greywater and use drip irrigation to reduce waste.
  
  4. *Food Forests & Perennials*
     - Create multi-layered systems: trees, shrubs, herbs, root crops, climbers.
     - Grow perennial crops (fruit trees, herbs) to reduce soil disturbance and effort.
  
  5. *Integrated Livestock*
     - Raise chickens, ducks, goats, and bees for natural pest control and soil fertility.
     - Practice rotational grazing and use manure for compost or biogas.
  
  6. *Waste Recycling & Energy*
     - Compost kitchen and garden waste.
     - Use solar panels, wind, or biogas systems for energy.
  
  7. *Natural Pest Control*
     - Use pest-repelling plants (e.g., mint, basil) and attract beneficial insects.
     - Apply homemade sprays (like neem oil) and rotate crops to disrupt pest cycles.
  
  8. *Sustainable Harvesting & Sharing*
     - Hand-harvest crops, leave some for reseeding.
     - Save seeds and share surplus with neighbors or sell locally.
  
  *Conclusion*
  Permaculture is a holistic farming method rooted in working with nature, not against it. It ensures food security, environmental restoration, and resilient communities through closed-loop systems and thoughtful land use.`,
      
      mr: `परमाकल्चर शेती ही निसर्गावर आधारित, स्वयंनिर्भर आणि पुनरुत्पादक शेती पद्धत आहे. ही शेती जैवविविधता, मृदा आरोग्य, जलसंवर्धन आणि कमी बाह्य स्रोत वापर यांवर भर देते.
  
  *मुख्य टप्पे:*
  
  1. *जमीन रचना व विभागणी*
     - हवामान, माती, उतार आणि पाण्याचे स्रोत तपासा.
     - वापरावर आधारित झोन (0 ते 5) मध्ये जमीन विभागा.
  
  2. *मातीची पुनर्बांधणी*
     - कंपोस्ट, मल्चिंग, आणि हरित खतांचा वापर करा.
     - नांगरणी टाळा आणि सहचर लागवड करा.
  
  3. *पाण्याचे व्यवस्थापन*
     - पावसाचे पाणी साठवा, स्वेल्स आणि समोच्च बेड वापरा.
     - ग्रेवॉटरचा पुनर्वापर करा आणि ठिबक सिंचन वापरा.
  
  4. *फूड फॉरेस्ट व बहुवर्षीय पिके*
     - विविध थरांचे रोपण करा – झाडे, झुडपे, औषधी वनस्पती, मुळे, वेल.
     - फळझाडे आणि जास्त काळ टिकणारी पिके लावा.
  
  5. *जनावरांचे एकत्रित पालन*
     - कोंबड्या, बदके, शेळ्या, मधमाश्या यांचा समावेश करा.
     - रोटेशनल ग्राझिंग करा आणि शेण खत म्हणून वापरा.
  
  6. *कचरा पुनर्वापर व ऊर्जा*
     - ओला कचरा कंपोस्ट करा.
     - सौरऊर्जा, वारा किंवा बायोगॅसचा वापर करा.
  
  7. *नैसर्गिक कीड नियंत्रण*
     - तुळस, पुदिना लावून कीड प्रतिबंध करा.
     - निंबोळी स्प्रे वापरा आणि पीक फेरबदल करा.
  
  8. *शाश्वत कापणी व सामायिकरण*
     - हळूहळू कापणी करा, बिया जतन करा.
     - अतिरिक्त उत्पन्न शेजाऱ्यांशी वाटा किंवा स्थानिक बाजारात विक्री करा.
  
  *निष्कर्ष*
  परमाकल्चर ही निसर्गाशी सुसंगत अशी शाश्वत शेती पद्धत आहे. ती अन्न सुरक्षा, पर्यावरण संवर्धन आणि समाज सशक्तीकरण यांना प्रोत्साहन देते.`,
    },
    marathiDescription: "पर्यावरणपूरक शेती निसर्गाशी सुसंगत पद्धतीने केली जाते.",
    videoUrl: "https://www.youtube.com/embed/PrvomRp-Wts",
    imageUrl: permaculture
  },
  {
    id: 12,
    title: {
      en: "Permaculture Farming",
      mr: "परमाकल्चर शेती"
    },
    description: {
      en: "Sustainable farming mimicking natural ecosystems.",
      mr: "निसर्गाचे अनुकरण करणारी शाश्वत शेती पद्धत."
    },
    fullText: {
      en: `Permaculture farming is a nature-based, regenerative approach to agriculture. It creates self-sufficient systems by mimicking natural ecosystems—promoting biodiversity, healthy soil, water conservation, and minimal external inputs.
  
  *Key Steps in Permaculture Farming*
  
  1. *Land Design & Zoning*
     - Assess climate, soil, slope, and water sources.
     - Divide land into zones (Zone 0 to Zone 5) based on usage—from home gardens to wild zones.
  
  2. *Soil Regeneration*
     - Use composting, mulching, and green manure to enrich soil.
     - Apply no-till farming and companion planting (e.g., marigolds for pest control, legumes for nitrogen).
  
  3. *Water Management*
     - Harvest rainwater and use swales (shallow ditches) and contour beds to retain moisture.
     - Recycle greywater and use drip irrigation to reduce waste.
  
  4. *Food Forests & Perennials*
     - Create multi-layered systems: trees, shrubs, herbs, root crops, climbers.
     - Grow perennial crops (fruit trees, herbs) to reduce soil disturbance and effort.
  
  5. *Integrated Livestock*
     - Raise chickens, ducks, goats, and bees for natural pest control and soil fertility.
     - Practice rotational grazing and use manure for compost or biogas.
  
  6. *Waste Recycling & Energy*
     - Compost kitchen and garden waste.
     - Use solar panels, wind, or biogas systems for energy.
  
  7. *Natural Pest Control*
     - Use pest-repelling plants (e.g., mint, basil) and attract beneficial insects.
     - Apply homemade sprays (like neem oil) and rotate crops to disrupt pest cycles.
  
  8. *Sustainable Harvesting & Sharing*
     - Hand-harvest crops, leave some for reseeding.
     - Save seeds and share surplus with neighbors or sell locally.
  
  *Conclusion*
  Permaculture is a holistic farming method rooted in working with nature, not against it. It ensures food security, environmental restoration, and resilient communities through closed-loop systems and thoughtful land use.`,
      
      mr: `परमाकल्चर शेती ही निसर्गावर आधारित, स्वयंनिर्भर आणि पुनरुत्पादक शेती पद्धत आहे. ही शेती जैवविविधता, मृदा आरोग्य, जलसंवर्धन आणि कमी बाह्य स्रोत वापर यांवर भर देते.
  
  *मुख्य टप्पे:*
  
  1. *जमीन रचना व विभागणी*
     - हवामान, माती, उतार आणि पाण्याचे स्रोत तपासा.
     - वापरावर आधारित झोन (0 ते 5) मध्ये जमीन विभागा.
  
  2. *मातीची पुनर्बांधणी*
     - कंपोस्ट, मल्चिंग, आणि हरित खतांचा वापर करा.
     - नांगरणी टाळा आणि सहचर लागवड करा.
  
  3. *पाण्याचे व्यवस्थापन*
     - पावसाचे पाणी साठवा, स्वेल्स आणि समोच्च बेड वापरा.
     - ग्रेवॉटरचा पुनर्वापर करा आणि ठिबक सिंचन वापरा.
  
  4. *फूड फॉरेस्ट व बहुवर्षीय पिके*
     - विविध थरांचे रोपण करा – झाडे, झुडपे, औषधी वनस्पती, मुळे, वेल.
     - फळझाडे आणि जास्त काळ टिकणारी पिके लावा.
  
  5. *जनावरांचे एकत्रित पालन*
     - कोंबड्या, बदके, शेळ्या, मधमाश्या यांचा समावेश करा.
     - रोटेशनल ग्राझिंग करा आणि शेण खत म्हणून वापरा.
  
  6. *कचरा पुनर्वापर व ऊर्जा*
     - ओला कचरा कंपोस्ट करा.
     - सौरऊर्जा, वारा किंवा बायोगॅसचा वापर करा.
  
  7. *नैसर्गिक कीड नियंत्रण*
     - तुळस, पुदिना लावून कीड प्रतिबंध करा.
     - निंबोळी स्प्रे वापरा आणि पीक फेरबदल करा.
  
  8. *शाश्वत कापणी व सामायिकरण*
     - हळूहळू कापणी करा, बिया जतन करा.
     - अतिरिक्त उत्पन्न शेजाऱ्यांशी वाटा किंवा स्थानिक बाजारात विक्री करा.
  
  *निष्कर्ष*
  परमाकल्चर ही निसर्गाशी सुसंगत अशी शाश्वत शेती पद्धत आहे. ती अन्न सुरक्षा, पर्यावरण संवर्धन आणि समाज सशक्तीकरण यांना प्रोत्साहन देते.`,
    },
    marathiDescription: "पर्यावरणपूरक शेती निसर्गाशी सुसंगत पद्धतीने केली जाते.",
    videoUrl: "https://www.youtube.com/embed/PrvomRp-Wts",
    imageUrl: permaculture
  },
];
const TechniqueCard = ({ technique, onSelect, language }) => (
  <div
    style={{
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "20px",
      textAlign: "center",
      width: "250px",
      margin: "10px",
      backgroundColor: "#fff",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease-in-out",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    {/* Technique Image */}
    <img
      src={technique.imageUrl}
      alt={technique.title[language]}
      style={{
        width: "100%",
        height: "150px",
        objectFit: "cover",
        borderRadius: "8px",
      }}
    />

    {/* Title */}
    <h2 style={{ fontSize: "1.2rem", margin: "10px 0", color: "#333", textAlign: "center" }}>
      {technique.title[language]}
    </h2>

    {/* Description */}
    <p style={{ fontSize: "0.9rem", color: "#555" }}>{technique.description[language]}</p>

    {/* Marathi Description */}
    <p style={{ fontSize: "0.9rem", fontStyle: "italic", color: "#777" }}>{technique.marathiDescription}</p>

    {/* Read More Button */}
    <button
      style={{
        padding: "8px 12px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
        transition: "background-color 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
      onClick={() => onSelect(technique)}
    >
      Read More
    </button>
  </div>
);

export default function LearningHub() {
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [language, setLanguage] = useState("en"); // Default language is English
  const [isPlaying, setIsPlaying] = useState(false); // State for speech synthesis

  // Function to handle text-to-speech
  const handleTextToSpeech = (text) => {
    if (isPlaying) {
      stopTextToSpeech();
      return;
    }

    // Get available voices
    const voices = window.speechSynthesis.getVoices();

    // Try to find a Marathi voice first
    let selectedVoice = voices.find((voice) => voice.lang === "mr-IN");

    // If Marathi is not supported, fall back to Hindi
    if (!selectedVoice) {
      selectedVoice = voices.find((voice) => voice.lang === "hi-IN");
    }

    // If neither Marathi nor Hindi is supported, alert the user
    if (!selectedVoice) {
      alert("Text-to-speech for Marathi or Hindi is not supported on this browser.");
      return;
    }

    const speech = new SpeechSynthesisUtterance(text);
    speech.voice = selectedVoice; // Set the selected voice
    speech.lang = selectedVoice.lang; // Set the language
    speech.rate = 1; // Adjust the rate of speech
    speech.pitch = 1; // Adjust the pitch of speech

    speech.onend = () => setIsPlaying(false); // Stop when done

    setIsPlaying(true);
    window.speechSynthesis.speak(speech);
  };

  // Function to stop text-to-speech
  const stopTextToSpeech = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  // Ensure voices are loaded properly
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log("Available voices:", voices);
    };

    // Load voices when they are available
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "20px", color: "#333" }}>
        Modern Farming Techniques
      </h1>
      {/* Language Selector */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label htmlFor="language-select" style={{ marginRight: "10px", fontSize: "1rem", color: "#333" }}>
          Select Language:
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: "5px 10px",
            fontSize: "1rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="en">English</option>
          <option value="mr">Marathi</option>
        </select>
      </div>
      {selectedTechnique ? (
        <div
          style={{
            textAlign: "left",
            maxWidth: "700px",
            margin: "auto",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ color: "#2c3e50", fontSize: "1.8rem", marginBottom: "10px", textAlign: "center" }}>
            {selectedTechnique.title[language]}
          </h2>

          {/* Play/Pause Button */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button
              style={{
                padding: "8px",
                color: "black",
                border: "none",
                background: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handleTextToSpeech(selectedTechnique.fullText[language])}
            >
              <i className={isPlaying ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high"}></i>
            </button>
          </div>

          {/* Display the full text */}
          <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "#444", textAlign: "justify" }}>
            {selectedTechnique.fullText[language]}
          </p>

          {/* Embedded YouTube Video */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <iframe
              width="100%"
              height="315"
              src={selectedTechnique.videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: "10px", maxWidth: "100%" }}
            ></iframe>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              style={{
                padding: "10px 16px",
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
              onClick={() => setSelectedTechnique(null)}
            >
              Back to List
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {farmingTechniques.map((technique) => (
            <TechniqueCard key={technique.id} technique={technique} onSelect={setSelectedTechnique} language={language} />
          ))}
        </div>
      )}
    </div>
  );
}