import React, { useEffect } from 'react';
import employeem from '../img/employeem.png';
import menumanage from '../img/menumanage.png';
import coupon from '../img/coupon.png';
import checkbillmanage from '../img/checkbillmanage.png';
import kitchenorder from '../img/kitchenorder.png';
import log from '../img/log.png';
import statistics from '../img/statistics.png';
import ordermanage from '../img/ordermanage.png';
import settingmain from '../img/settingmain.png';
import '../collection/manual.css';
import { Grid, Typography } from '@material-ui/core';
import Footer from '../components/Footer';

const FeaturePage = () => {
  useEffect(() => {
    let mainNavLinks = document.querySelectorAll('nav ul li a');
    let mainSections = document.querySelectorAll('main section');

    const options = {
      root: document.getElementById('#main'),
      rootMargin: '0% 0% -80% 0%',
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let link = document.querySelector(
            '[href="#' + entry.target.id + '"]'
          );
          if (link) {
            mainNavLinks.forEach((item) => {
              item.classList.remove('current');
            });
            link.classList.add('current');
          }
        }
      });
    }, options);
    mainSections.forEach((target) => {
      observer.observe(target);
    });
  });
  return (
    <div>
      <div class="feature">
        <header>
          <h2>ฟีเจอร์</h2>
        </header>
        <Grid container>
          <Grid item sm={9}>
            <main>
              <section id="employeemanagement">
                <h1>จัดการพนักงาน</h1>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: '2%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexBasis: '100%',
                      flexDirection: 'column',
                      flex: 1,
                      textAlign: 'right',
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                  >
                    จัดการพนักงานง่ายๆด้วยมือคุณ​
                    พร้อมทั้งการจัดตำปหน่งหน้าที่ของพนักงานในร้านของคุณ
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexBasis: '100%',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <img
                      src={employeem}
                      width={'100%'}
                      style={{ borderStyle: 'dashed', borderColor: '#565656' }}
                    />
                  </div>
                </div>
              </section>
              <section id="menumanagement">
                <h1>รายการอาหาร</h1>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: '2%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexBasis: '100%',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <img
                      src={menumanage}
                      width={'100%'}
                      style={{ borderStyle: 'dashed', borderColor: '#565656' }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexBasis: '100%',
                      flexDirection: 'column',
                      flex: 1,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                  >
                    เมนูอาหารที่คุณสามารถสร้างหมวดหมู่ได้เอง
                    อีกทั้งเลือกได้ว่าเป็นจานหลักหรือเป็นท๊อปปิ้งได้ด้วยย
                  </div>
                </div>
              </section>
              <section id="kitchenorder">
                <h1>ออเดอร์ห้องครัว</h1>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: '2%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexBasis: '100%',
                      flexDirection: 'column',
                      flex: 1,
                      paddingLeft: 20,
                      textAlign: 'right',
                      paddingRight: 20,
                    }}
                  >
                    ลากๆๆโยงๆๆ จัดการเมนูในห้องควรด้วยสถานะ
                    ในการบ่งบอกว่าใกล้เสร็จหรือยัง
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexBasis: '100%',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <img
                      src={kitchenorder}
                      width={'100%'}
                      style={{ borderStyle: 'dashed', borderColor: '#565656' }}
                    />
                  </div>
                </div>
              </section>
              <section id="ordermanagement">
                <h1>จัดการออเดอร์</h1>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: '2%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexBasis: '100%',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <img
                      src={ordermanage}
                      width={'100%'}
                      style={{ borderStyle: 'dashed', borderColor: '#565656' }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexBasis: '100%',
                      flexDirection: 'column',
                      flex: 1,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                  >
                    จัดการโต๊ะอาหาร และสถานะในการบอกว่าโต๊ะนี้แาหารครบรึยังง
                  </div>
                </div>
              </section>
              <section id="checkbillmanage">
                <h1>จัดการชำระเงิน</h1>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: '2%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexBasis: '100%',
                      flexDirection: 'column',
                      flex: 1,
                      paddingLeft: 20,
                      textAlign: 'right',
                      paddingRight: 20,
                    }}
                  >
                    เลือกสิ เช็คสถานะการชำระเงินของแต่ละโต๊ะได้เลยนะะ
                    จ่ายปุ๊ปปิ๊งปั๊บ
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexBasis: '100%',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <img
                      src={checkbillmanage}
                      width={'100%'}
                      style={{ borderStyle: 'dashed', borderColor: '#565656' }}
                    />
                  </div>
                </div>
              </section>
              <section id="coupon">
                <h1>คูปอง</h1>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: '2%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexBasis: '100%',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <img
                      src={coupon}
                      width={'100%'}
                      style={{ borderStyle: 'dashed', borderColor: '#565656' }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexBasis: '100%',
                      flexDirection: 'column',
                      flex: 1,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                  >
                    ส่วนลดราคาที่จัดการได้ด้วยคุณ ลดสิแบบเปอร์เซ้นก็ดี
                    แบบราคาก็ได้
                  </div>
                </div>
              </section>
              <section id="historylog">
                <h1>ประวัติการใช้งาน</h1>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: '2%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexBasis: '100%',
                      flexDirection: 'column',
                      flex: 1,
                      paddingLeft: 20,
                      textAlign: 'right',
                      paddingRight: 20,
                    }}
                  >
                    ตรวจสอบการใช้งานสิ เอ๊ะล่าสุดใครทำอะไรไปนะ!!
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexBasis: '100%',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <img
                      src={log}
                      width={'100%'}
                      style={{ borderStyle: 'dashed', borderColor: '#565656' }}
                    />
                  </div>
                </div>
              </section>
              <section id="statistics">
                <h1>สถิติ</h1>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: '2%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexBasis: '100%',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <img
                      src={statistics}
                      height={250}
                      style={{ borderStyle: 'dashed', borderColor: '#565656' }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexBasis: '100%',
                      flexDirection: 'column',
                      flex: 1,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                  >
                    ดูสถิติกันหน่อยยอดขายเป็นยังไงน้า
                    เอ๊ะมีให้เลือกดูตั้งหลายแบบเลยหรอเนี่ยยย
                  </div>
                </div>
              </section>
              <section id="setting">
                <h1>ตั้งค่าร้าน</h1>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: '2%',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexBasis: '100%',
                      flexDirection: 'column',
                      flex: 1,
                      paddingLeft: 20,
                      textAlign: 'right',
                      paddingRight: 20,
                    }}
                  >
                    ตั้งค่าได้สบายโคตรรรรร
                    ทั้งบัญชีปละรูปภาพร้านหรือจะเช็ควันหมดอายุได้ด้วน้าา
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexBasis: '100%',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <img
                      src={settingmain}
                      width={'100%'}
                      style={{ borderStyle: 'dashed', borderColor: '#565656' }}
                    />
                  </div>
                </div>
              </section>
            </main>
          </Grid>
          <Grid item sm={3}>
            <nav>
              <ul>
                <li>
                  <a href="#employeemanagement">จัดการพนักงาน</a>
                </li>
                <li>
                  <a href="#menumanagement">รายการอาหาร</a>
                </li>
                <li>
                  <a href="#kitchenorder">ออเดอร์ห้องครัว</a>
                </li>
                <li>
                  <a href="#ordermanagement">จัดการออเดอร์</a>
                </li>
                <li>
                  <a href="#checkbillmanage">จัดการออเดอร์</a>
                </li>
                <li>
                  <a href="#coupon">คูปอง</a>
                </li>
                <li>
                  <a href="#historylog">ประวัติการใช้งาน</a>
                </li>
                <li>
                  <a href="#statistics">สถิติ</a>
                </li>
                <li>
                  <a href="#setting">ตั้งค่าร้าน</a>
                </li>
              </ul>
            </nav>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};
export default FeaturePage;
