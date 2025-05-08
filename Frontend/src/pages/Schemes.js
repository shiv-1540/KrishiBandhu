import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import SchemeCard from '../components/SchemeCard';
import "./Schemes.css";

const App = () => {
    const [residence, setResidence] = useState(null);
    const [benefit, setBenefit] = useState(null);
    const [dbt, setDbt] = useState(null);
    const [mode, setMode] = useState(null);
    const [language, setLanguage] = useState("en-US"); // Add language state

    let data = [
        {
            "Name": "Agri-Clinics And Agri-Business Centres Scheme",
            "link": "https://www.myscheme.gov.in/schemes/acandabc",
            "Residence": "Both",
            "Benefit": "Composite",
            "DBT": "Yes",
            "Employment": "All",
            "Application Mode": "Online",
            "Description": {
                "en-US": "A welfare scheme by the Ministry of Agriculture and Farmers' Welfare was launched in 2002...",
                "mr-IN": "कृषी आणि शेतकरी कल्याण मंत्रालयाची कल्याणकारी योजना २००२ मध्ये सुरू करण्यात आली..."
            }
        },
        {
            "Name": "Agricultural Extension",
            "link": "https://www.myscheme.gov.in/schemes/ae",
            "Residence": "Both",
            "Benefit": "Kind",
            "DBT": "Yes",
            "Employment": "All",
            "Application Mode": "Online",
            "Description": {
                "en-US": "Extension Division endeavours towards successful implementation of Agricultural Extension activities...",
                "mr-IN": "विस्तार विभाग कृषी विस्तार क्रियाकलापांच्या यशस्वी अंमलबजावणीसाठी प्रयत्नशील आहे..."
            }
        },
        {
            "Name": "Agricultural Marketing Infrastructure",
            "link": "https://www.myscheme.gov.in/schemes/ami",
            "Residence": "Both",
            "Benefit": "Composite",
            "DBT": "No",
            "Employment": "All",
            "Application Mode": "Offline",
            "Description": {
                "en-US": "The scheme envisages value addition and processing at farmers level...",
                "mr-IN": "शेतकऱ्यांच्या पातळीवर मूल्यवर्धन आणि प्रक्रिया योजनेचा उद्देश आहे..."
            }
        },
        {
            "Name": "Agriculture Infrastructure Fund",
            "link": "https://www.myscheme.gov.in/schemes/aif",
            "Residence": "Both",
            "Benefit": "Cash",
            "DBT": "No",
            "Employment": "All",
            "Application Mode": "Online",
            "Description": {
                "en-US": "The financing facility will be provided for funding Agriculture Infrastructure Projects...",
                "mr-IN": "कृषी पायाभूत सुविधा प्रकल्पांसाठी वित्तपुरवठा सुविधा प्रदान केली जाईल..."
            }
        },
        {
            "Name": "Agroforestry component under RKVY",
            "link": "https://www.myscheme.gov.in/schemes/agroforestry",
            "Residence": "Both",
            "Benefit": "Cash",
            "DBT": "No",
            "Employment": "All",
            "Application Mode": "Offline",
            "Description": {
                "en-US": "In 2023-24, the scheme was restructured as an Agroforestry component...",
                "mr-IN": "२०२३-२४ मध्ये, योजना कृषी वनीकरण घटक म्हणून पुनर्रचना करण्यात आली..."
            }
        },
        {
            "Name": "Coconut Palm Insurance Scheme",
            "link": "https://www.myscheme.gov.in/schemes/cpis",
            "Residence": "Both",
            "Benefit": "Cash",
            "DBT": "No",
            "Employment": "All",
            "Application Mode": "Offline",
            "Description": {
                "en-US": "The Coconut Palm Insurance Scheme (CPIS) is being implemented...",
                "mr-IN": "नारळ पाम विमा योजना (CPIS) लागू केली जात आहे..."
            }
        },
        {
            "Name": "India Afghanistan Fellowship",
            "link": "https://www.myscheme.gov.in/schemes/indagff",
            "Residence": "Both",
            "Benefit": "Cash",
            "DBT": "Yes",
            "Employment": "All",
            "Application Mode": "Online",
            "Description": {
                "en-US": "The India-Afghanistan Fellowship program introduced by the Indian Council of Agricultural Research...",
                "mr-IN": "भारतीय कृषी संशोधन परिषदेने सुरू केलेली भारत-अफगाणिस्तान फेलोशिप योजना..."
            }
        },
        {
            "Name": "India Africa Fellowship",
            "link": "https://www.myscheme.gov.in/schemes/iaf",
            "Residence": "Both",
            "Benefit": "Cash",
            "DBT": "Yes",
            "Employment": "All",
            "Application Mode": "Online",
            "Description": {
                "en-US": "Launched under the India-Africa Forum Summit in 2010-11...",
                "mr-IN": "२०१०-११ मध्ये भारत-अफ्रिका फोरम शिखर परिषदेत सुरू करण्यात आले..."
            }
        },
        {
            "Name": "Indian Agricultural Research Institute - Scholarship",
            "link": "https://www.myscheme.gov.in/schemes/iaris",
            "Residence": "Both",
            "Benefit": "Cash",
            "DBT": "Yes",
            "Employment": "All",
            "Application Mode": "Online",
            "Description": {
                "en-US": "The Indian Agricultural Research Institute (IARI) Junior and Senior Scholarship...",
                "mr-IN": "भारतीय कृषी संशोधन संस्था (IARI) कनिष्ठ आणि वरिष्ठ शिष्यवृत्ती..."
            }
        },
        {
            "Name": "Integrated Scheme on Agriculture Cooperation",
            "link": "https://www.myscheme.gov.in/schemes/isac",
            "Residence": "Both",
            "Benefit": "Kind",
            "DBT": "No",
            "Employment": "All",
            "Application Mode": "Offline",
            "Description": {
                "en-US": "The Integrated Scheme on Agriculture Cooperation (ISAC) is a Central Sector Scheme...",
                "mr-IN": "कृषी सहकारिता (ISAC) वर एकात्मिक योजना ही केंद्रीय क्षेत्र योजना आहे..."
            }
        }
        // Add more schemes with translations...
    ];

    let newData = [];

    if (residence != null) {
        data.forEach((ele) => {
            if (ele.Residence === residence) newData.push(ele);
        });
    }
    if (mode != null) {
        data.forEach((ele) => {
            if (ele["Application Mode"] === mode) newData.push(ele);
        });
    }
    if (benefit != null) {
        data.forEach((ele) => {
            if (ele.Benefit === benefit) newData.push(ele);
        });
    }
    if (dbt != null) {
        data.forEach((ele) => {
            if (ele.DBT === dbt) newData.push(ele);
        });
    }

    return (
        <div className="h-full container1">
            <Sidebar setMode={setMode} setBenefit={setBenefit} setDbt={setDbt} setResidence={setResidence} />
            <div className="content1">
                <SearchBar setMode={setMode} setBenefit={setBenefit} setDbt={setDbt} setResidence={setResidence} />
                <div className="language-selector">
                    <label htmlFor="language-select">Select Language:</label>
                    <select
                        id="language-select"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="en-US">English</option>
                        <option value="mr-IN">Marathi</option>
                    </select>
                </div>
                <div className="scheme-list1">
                    {newData.length ? newData.map((element) => {
                        return <SchemeCard key={element.Name} data={element} language={language} />;
                    }) : data.map((element) => {
                        return <SchemeCard key={element.Name} data={element} language={language} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default App;