// src/components/Header.js
import React from 'react';
import './Header.css';
const Header = () => {
    return (
        <header className="header">
           <nav>
              <a className="brand" href="/" title="MagicPDF">
              <img src="../assets/images/pattern-bg.png" alt="magicPDF"/>
              </a>
              <div className="menu">
                 <span className="menu--sm"><i className="ico ico--tools"></i></span>
                 <ul>
                    <li><a href="/merge_pdf">Merge PDF</a></li>
                    <li><a href="/split_pdf">Split PDF</a></li>
                    <li><a href="/compress_pdf">Compress PDF</a></li>
                 </ul>
                 <ul className="menu__main">
                    <li className="has-dropdown has-dropdown--full">
                       <div className="dropdown dropdown--full">
                          <ul>
                             <li>
                                <ul>
                                   <li>
                                      <div className="nav__title">Organize PDF</div>
                                   </li>
                                   <li><a href="/merge_pdf"><i className="ico ico--merge"></i> Merge PDF</a></li>
                                   <li><a href="/split_pdf"><i className="ico ico--split"></i> Split PDF</a></li>
                                   <li><a href="/remove-pages"><i className="ico ico--remove"></i> Remove pages</a>
                                   </li>
                                   <li><a href="/split_pdf#split,extract"><i className="ico ico--extract"></i> Extract
                                      pages</a>
                                   </li>
                                   <li><a href="/organize-pdf"><i className="ico ico--organize"></i> Organize PDF</a>
                                   </li>
                                   <li><a href="/scan-pdf"><i className="ico ico--scan"></i> Scan to PDF</a></li>
                                </ul>
                             </li>
                             <li>
                                <ul>
                                   <li>
                                      <div className="nav__title">Optimize PDF</div>
                                   </li>
                                   <li><a href="/compress_pdf"><i className="ico ico--compress"></i> Compress PDF</a>
                                   </li>
                                   <li><a href="/repair-pdf"><i className="ico ico--repair"></i> Repair PDF</a></li>
                                   <li><a href="/ocr-pdf"><i className="ico ico--pdfocr"></i> OCR PDF</a></li>
                                </ul>
                             </li>
                             <li>
                                <ul>
                                   <li>
                                      <div className="nav__title">Convert to PDF</div>
                                   </li>
                                   <li><a href="/jpg_to_pdf"><i className="ico ico--jpgpdf"></i> JPG to PDF</a></li>
                                   <li><a href="/word_to_pdf"><i className="ico ico--wordpdf"></i>WORD to PDF</a></li>
                                   <li><a href="/powerpoint_to_pdf"><i
                                      className="ico ico--powerpointpdf"></i> POWERPOINT to PDF</a></li>
                                   <li><a href="/excel_to_pdf"><i className="ico ico--excelpdf"></i> EXCEL to PDF</a>
                                   </li>
                                   <li><a href="/html-to-pdf"><i className="ico ico--htmlpdf"></i> HTML to PDF</a></li>
                                </ul>
                             </li>
                             <li>
                                <ul>
                                   <li>
                                      <div className="nav__title">Convert from PDF</div>
                                   </li>
                                   <li><a href="/pdf_to_jpg"><i className="ico ico--pdfjpg"></i> PDF to JPG</a></li>
                                   <li><a href="/pdf_to_word"><i className="ico ico--pdfword"></i>PDF to WORD</a></li>
                                   <li><a href="/pdf_to_powerpoint"><i className="ico ico--pdfpowerpoint"></i> PDF to
                                      POWERPOINT</a>
                                   </li>
                                   <li><a href="/pdf_to_excel"><i className="ico ico--pdfexcel"></i> PDF to EXCEL</a>
                                   </li>
                                   <li><a href="/convert-pdf-to-pdfa"><i className="ico ico--pdfa"></i> PDF to
                                      PDF/A</a>
                                   </li>
                                </ul>
                             </li>
                             <li>
                                <ul>
                                   <li>
                                      <div className="nav__title">Edit PDF</div>
                                   </li>
                                   <li><a href="/rotate_pdf"><i className="ico ico--rotate"></i>Rotate PDF</a></li>
                                   <li><a href="/add_pdf_page_number"><i className="ico ico--pagenumber"></i> Add page
                                      numbers</a>
                                   </li>
                                   <li><a href="/pdf_add_watermark"><i className="ico ico--watermark"></i> Add
                                      watermark</a>
                                   </li>
                                   <li><a href="/edit-pdf"><i className="ico ico--editpdf"></i>Edit PDF</a></li>
                                </ul>
                             </li>
                             <li>
                                <ul>
                                   <li>
                                      <div className="nav__title">PDF security</div>
                                   </li>
                                   <li><a href="/unlock_pdf"><i className="ico ico--unlock"></i> Unlock PDF</a></li>
                                   <li><a href="/protect-pdf"><i className="ico ico--protect"></i>Protect PDF</a></li>
                                   <li><a href="/sign-pdf"><i className="ico ico--sign"></i>Sign PDF</a></li>
                                   <li><a href="/redact-pdf"><i className="ico ico--redact"></i> Redact PDF</a></li>
                                   <li><a href="/compare-pdf"><i className="ico ico--pdfcompare"></i> Compare PDF</a>
                                   </li>
                                </ul>
                             </li>
                          </ul>
                       </div>
                    </li>
                 </ul>
              </div>
              <div className="actions">
                 <a href="/desktop" className="hide--sm tooltip tooltip--bottom" title="iLovePDF Desktop, work offline">
                 <i className="ico ico--desk"></i>
                 </a>
                 <a href="/login" className="link--secondary hide--sm">Login</a>
                 <a href="/register" className="btn btn--sm hide--sm">Sign up</a>
                 <a href="/register" className="show--sm">
                 <i className="ico ico--auth"></i>
                 </a>
                 <ul>
                    <li className="has-dropdown">
                       <span><i className="ico ico--hamburger"></i></span>
                       <div className="dropdown dropdown--single dropdown--left">
                          <ul>
                             <li><a href="/"><i className="ico ico--ilovepdf"></i> Home</a></li>
                             <li className="has-dropdown">
                                <span><i className="ico ico--product"></i> Product</span>
                                <ul className="dropdown">
                                   <li><a href="/desktop"><i className="ico ico--desktop"></i> Desktop</a></li>
                                   <li><a href="/mobile"><i className="ico ico--app"></i> Mobile</a></li>
                                   <li><a href="https://signature.ilovepdf.com"><i
                                      className="ico ico--signature"></i> Signature</a></li>
                                   <li><a href="/features"><i className="ico ico--features"></i> Features</a></li>
                                   <li><a href="https://developer.ilovepdf.com" target="_blank" rel="noopener"><i
                                      className="ico ico--developer"></i> API Rest</a></li>
                                   <li><a href="https://wordpress.org/plugins/ilovepdf/" rel="nofollow noopener"
                                      target="_blank"><i className="ico ico--wordpress"></i> Wordpress Plugin</a>
                                   </li>
                                </ul>
                             </li>
                             <li className="has-dropdown">
                                <span><i className="ico ico--solutions"></i> Solutions</span>
                                <ul className="dropdown">
                                   <li><a href="/business"><i className="ico ico--business"></i> Business</a></li>
                                   <li><a href="/education"><i className="ico ico--education"></i> Education</a></li>
                                   <li><a href="https://developer.ilovepdf.com" target="_blank" rel="noopener"><i
                                      className="ico ico--app"></i> Developers</a></li>
                                </ul>
                             </li>
                             <li><a href="/pricing"><i className="ico ico--pricing"></i> Pricing</a></li>
                             <li className="divider"></li>
                             <li className="has-dropdown">
                                <span><i className="ico ico--lang"></i> Language</span>
                                <div className="dropdown lang">
                                   <span className="lang__current">
                                   <i className="ico ico--world"></i>
                                   English <i className="ico ico--down"></i>
                                   </span>
                                   <ul className="lang__menu">
                                      <li>
                                         <a href="/">
                                            <svg aria-hidden="true" width="12" height="12" role="img"
                                               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                               <path fill="currentColor"
                                                  d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"
                                                  className=""></path>
                                            </svg>
                                            English
                                         </a>
                                      </li>
                                      <li><a href="/es"> Español</a></li>
                                      <li><a href="/fr"> Français</a></li>
                                      <li><a href="/de"> Deutsch</a></li>
                                      <li><a href="/it"> Italiano</a></li>
                                      <li><a href="/pt"> Português</a></li>
                                      <li><a href="/ja"> 日本語</a></li>
                                      <li><a href="/ru"> Pусский</a></li>
                                      <li><a href="/ko"> 한국어</a></li>
                                      <li><a href="/zh-cn"> 中文 (简体)</a></li>
                                      <li><a href="/zh-tw"> 中文 (繁體)</a></li>
                                      <li><a href="/ar"> العربية</a></li>
                                      <li><a href="/bg"> Български</a></li>
                                      <li><a href="/ca"> Català</a></li>
                                      <li><a href="/nl"> Nederlands</a></li>
                                      <li><a href="/el"> Ελληνικά</a></li>
                                      <li><a href="/hi"> हिन्दी</a></li>
                                      <li><a href="/id"> Bahasa Indonesia</a></li>
                                      <li><a href="/ms"> Bahasa Melayu</a></li>
                                      <li><a href="/pl"> Polski</a></li>
                                      <li><a href="/sv"> Svenska</a></li>
                                      <li><a href="/th"> ภาษาไทย</a></li>
                                      <li><a href="/tr"> Türkçe</a></li>
                                      <li><a href="/uk"> Українська</a></li>
                                      <li><a href="/vi"> Tiếng Việt</a></li>
                                   </ul>
                                </div>
                             </li>
                             <li className="has-dropdown">
                                <span><i className="ico ico--help"></i> Help</span>
                                <ul className="dropdown">
                                   <li><a href="/help/faq"><i className="ico ico--faq"></i> FAQ</a></li>
                                   <li><a href="/help/documentation"><i
                                      className="ico ico--documentation"></i> Tools</a></li>
                                   <li><a href="/help/legal"><i className="ico ico--legal"></i> Legal &amp; Privacy</a>
                                   </li>
                                   <li><a href="/help/about"><i className="ico ico--about"></i> Our Story</a></li>
                                   <li><a href="/contact"><i className="ico ico--contact"></i> Contact</a></li>
                                </ul>
                             </li>
                             <li className="divider"></li>
                             <li><a href="https://www.iloveimg.com/"><i className="ico ico--iloveimg"></i> iLoveIMG</a>
                             </li>
                          </ul>
                       </div>
                    </li>
                 </ul>
              </div>
           </nav>
        </header>
    );
};


export default Header;