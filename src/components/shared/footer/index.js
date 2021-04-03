import React, { useState } from 'react';

const Footer = ({ openYapeModal = () => {} }) => {
  return (
    <div className="document__footer">
    <footer class="site-footer">
        <p><a mailto="ventas@starscorporation.pe">ventas@starscorporation.pe</a></p>
        <hr></hr>
        <div class="container">
            <div class="row">
            <div class="col-md-8 col-sm-6 col-xs-12">
                <p class="copyright-text">Copyright &copy; 2020 - 2021 Todos los derechos reservados por 
            <a href="https://starscorporation.pe/" target="_blank"> Stars Corporation</a>
                </p>
            </div>

            <div class="col-md-4 col-sm-6 col-xs-12 brands-payments">
                <ul>
                <li>
                    <img src="./images/visa.png" />
                </li>
                <li>
                    <img src="./images/mscd.png" />
                </li>
                <li onClick={openYapeModal}>
                    <img src="./images/yape.png" style={{cursor: 'pointer'}}/>
                </li>
                <li>
                  <a href="https://www.facebook.com/Tus-Accesorios-Perú-110581157769340/" target="_blank"><img src="./images/icon-fb.png" /></a>
                    
                </li>
                </ul>
            </div>
            </div>
        </div>
    </footer>
</div>
  )
}

export default Footer;
