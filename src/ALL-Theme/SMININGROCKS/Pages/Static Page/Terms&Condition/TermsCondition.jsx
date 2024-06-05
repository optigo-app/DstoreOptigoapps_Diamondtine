import React, { useEffect, useState } from 'react';
import "./TermsCondition.css";
import { storImagePath } from '../../../Utils/globalFunctions/GlobalFunction';
import logo from '../../assets/Logo1.png'
import Footer from '../../Components/home/Footer/Footer';

function TermsAndConditions() {

  const [htmlContent, setHtmlContent] = useState('');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(`${storImagePath()}/html/TermsCondition.html`)
      .then((response) => response.text())
      .then((html) => {
        setHtmlContent(html);
        console.log('htmlssssssss', html);
      })
      .catch((error) => {
        console.error('Error fetching the HTML file:', error);
      });
  }, []);

  return (
    <div style={{
      paddingTop: '110px',
    }}>
      <div className='daimondsEveryAbout'>
        <div style={{ marginInline: '10%', paddingBottom: '80px' }}>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default TermsAndConditions;
