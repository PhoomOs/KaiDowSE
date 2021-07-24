import React, { useRef, useEffect } from 'react';
import employeem from '../img/employeem.png';
import menumanage from '../img/menumanage.png';
import coupon from '../img/coupon.png';
import checkbillmanage from '../img/checkbillmanage.png';
import kitchenorder from '../img/kitchenorder.png';
import log from '../img/log.png';
import statistics from '../img/statistics.png';
import ordermanage from '../img/ordermanage.png';
import ordermanage2 from '../img/ordermanage2.png';
import setting from '../img/setting.png';
import setting2 from '../img/setting2.png';
import setting3 from '../img/setting3.png';
import settingmain from '../img/settingmain.png';
import '../collection/manual.css';
import { Grid, Typography } from '@material-ui/core';
const ManualPage = () => {
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
    <div class="manual">
      <header>
        <h2>คู่มือการใช้งาน</h2>
      </header>
      <Grid container>
        <Grid item sm={3} style={{ background: 'white' }}>
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
                  การจัดการพนักงานเมื่อเริ่มต้นการใช้งานครั้งแรก
                  สามารถเพิ่มพนักงานโดยสามารถกดปุ่มเพิ่มพนักงาน
                  และกรอกข้อมูลของพนักงานพร้อมทั้งสร้างรหัสผ่านในการเข้าสู่ระบบสำหรับบัญชรของทางร้าน
                  และเพิ่มตำแหน่งสำหรับความสามารถในการใช้งาน
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
                  รายการเมนูอาหาร
                  สามารถเพิ่มเติมหมวดหมู่ของอาหารได้ตามต้องการที่แท็บบาร์ด้านบน
                  โดยสามารถกำหนดได้ด้วยว่าเป็นอารจานหลักหรือเป็นท๊อปปิ้งสำหรับเพิ่มเติมในอาหารจานหลัก
                  และต่อมาก็เริ่มสร้างเมนูอาหารกันเลย
                  ในส่วนของการสร้างเมนูอาหารนั้นก็ยังสามารเพิ่มรูปภาพกำหนดหมวดหมู่และยังเพิ่มรูปแบบของราคาได้ด้วย
                  เช่น ร้านเรามีหลายราคา พิเศษ ธรรมดา
                  พิเศษมากเป็นต้นถึงเวลาแล้วไปลองกันโลดด
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
                  ทีเด็ดห้องครัวของเรา
                  เป็นส่วนที่เอาไว้ติดตามรายการอาหารหลังจากการเพิ่มเข้ามาของออเดอร์
                  โดยสามารถติดตามได้ 3 สถานะ ได้แก่ รอรับออเดอร์
                  กำลังทำและเสร็จสิ้นน
                  โดยจะเป็นการทำงานร่วมกันระหว่างแคชเชียร์และห้องครัว
                  โดยสามารถลากข้อมูลเอาได้เลย ง่ายใช่มั้ยล่าา
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
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                >
                  ส่วนของการจัดการโต๊ะอาหาร
                  โดยเราสามารถสร้างโต๊ะอาหารใหม่ที่เข้ามา
                  และยังสามารถแก้ไขหรือลบก็ได้ด้วยนอกจากนั้นเรายังมีฟีเจอร์พิเศษก็คือ
                  การแสดงสถานะการเสร็จแล้วของออเดอร์เป็นส่วนของการแจ้งเตือนด้านซ้ายมือ
                  เมื่อมีอรายการอาหารเสร็จสิ้นพร้อมเสริฟนั่นเองง
                  นอกจากนั้นยังแสดงสถานะการจัดเสิรฟอาการของแต่ละโต๊ะด้วยนะ
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
                  }}
                >
                  <img
                    src={ordermanage2}
                    width={'100%'}
                    style={{
                      borderStyle: 'dashed',
                      borderColor: '#565656',
                      marginTop: 20,
                    }}
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
                    marginTop: 20,
                  }}
                >
                  ครั้งแรกเมื่อสร้างโต๊ะมาจะทำการพาเข้ามาหน้าจัดการเรื่องเมนูมาเพื่อเลือกเมนู
                  เพื่อรอรับการเสิรฟในชื่อโต๊ะนัั้นๆ
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
                  หน้าจัดการการชำระเงิน เป็นหน้าที่แสดงสถานะระหว่างก่อนชำระเงิน
                  เมื่อกดเข้าไปจะแสดงหน้าต่างเพื่อเลือกรูปแบบการชำระเงินจากนั้นก็จะรอการชำระจากนั้นก็จะแสดงสถานะว่าชำระเสร็จแล้ววว
                  เป็นรูปเครื่องหมายถูกและกรอบสีเขียววว
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
                  หน้าคูปองสำหรับการสร้างโปรโมชั่นของร้าน
                  เจ้าของร้านเท่านั้นที่จะมีสิทธิ์ในการเข้าถึงการสร้างโปรโมชั่นหรือลบโปรโมชั่นออก
                  โดยสามารถกำหนดเป็นทั้งจพนวนเงินหรือเป็นเปอร์เซ้นก็ได้ว้าวว
                  ทดลองร้อยเปอไปเลยยย
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
                  หน้าตรวจสอบประวัติการใช้งาน
                  สำหรับเจ้าของร้านที่จะสามารถตรวจสอบประวัติการใช้งานต่างๆว่าใครทำอะไรหรือคิดเงินผิดหรือทำอะไรต่างๆพลาดไปก็สามารถเข้ามาเช็คดูเพื่อตรวจหรือแก้ไขกันต่อไป
                  แถมมีฟิลเตอร์พร้อมกับการแสดงข้อมูลพร้อมกันเยอะๆด้วยย
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
                  การตรวจสอบทางสถิติถือว่าเป็นการแสดงผลที่ดีมาก
                  โดยการแสดงผลของรายละเอียดต่างๆของร้านค้านั้นก็จะมารวมในหน้านี้โดยก็จะมี
                  4 หัวข้อหลักด้วยกัน ได้แก่ จำนวนเงินรายรับ จำนวนลูกค้้า
                  จำนวนอาหาร และรายละเอียดอหารหมวดหมู่ต่างๆ
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
                  หน้าตั้งค่าสำหรับการตั้งค่าบัญชีและตั้งค่าร้านและตรวจสอบสถานะการใช้งาน
                  การตั้งค่าร้านสำข้อมูลชื่อร้านและรูปภาพเพื่อแสดงเอกลักษณืของร้าน
                  การเช็คสถานะบอกถึงอายุในการใช้งานก่อนที่จะต้องชำระรอบถัดไป
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
                <div
                  style={{
                    display: 'flex',
                    flexBasis: '100%',
                    flexDirection: 'column',
                    flex: 1,
                    marginTop: 20,
                  }}
                >
                  <img
                    src={setting}
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
                    marginTop: 20,
                  }}
                >
                  การตั้งค่าบัญชีร้านโดยการสร้างข้อมูลการชำระเงินเพื่อต่ออายุการใช้งาน
                  โดยการเชื่อมกับบัญชีธนาคารหรือบัตรเครดิต
                </div>
              </div>
            </section>
          </main>
        </Grid>
      </Grid>
    </div>
  );
};
export default ManualPage;
