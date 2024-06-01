import React, { useEffect, useState } from 'react';
import { storImagePath } from '../../../Utils/globalFunctions/GlobalFunction';
import Footer from '../../Components/home/Footer/Footer';

function PrivacyPolicy() {

  const [htmlContent, setHtmlContent] = useState('');
   
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(`${storImagePath()}/html/PrivacyPolicy.html`)
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
      paddingTop: '110px'
    }}>
      <div className='daimondsEveryAbout'>
        <div style={{ marginInline: '10%', paddingTop: '50px' }}>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default PrivacyPolicy;
