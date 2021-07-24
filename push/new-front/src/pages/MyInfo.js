import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import '../collection/myinfo.css';
import Footer from '../components/Footer';
const MyInfo = () => {
  useEffect(() => {
    window.addEventListener('scroll', debounce(checkSlide));
    return () => {
      window.removeEventListener('scroll', debounce(checkSlide));
    };
  }, []);
  function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  const sliderImages = document.querySelectorAll('.slide-in');
  function checkSlide(e) {
    sliderImages.forEach((sliderImage) => {
      const slideInAt =
        window.scrollY + window.innerHeight - sliderImage.height / 2;
      const imageBottom = sliderImage.offsetTop + sliderImage.height;
      const isHalfShown = slideInAt > sliderImage.offsetTop;
      const isNotScrolledPast = window.scrollY < imageBottom;
      if (isHalfShown && isNotScrolledPast) {
        sliderImage.classList.add('active');
      } else {
        sliderImage.classList.remove('active');
      }
    });
  }
  return (
    <div>
      <header class="header" style={{ fontSize: 50, fontWeight: 601 }}>
        เกี่ยวกับเรา
      </header>
      <div class="site-wrap">
        <img
          src="https://mlbpxln06uaa.i.optimole.com/Xy-0n24-G2XUz6vf/w:800/h:451/q:auto/https://ozarkwebdesign.com/wp-content/uploads/2019/10/business-memes-001.jpg"
          width={500}
          class="align-left slide-in"
        />
        <h3>เราคือใคร</h3>
        <p>
          Kaidow คือแพลทฟอร์มแห่งทางเลือกสำหรับธุรกิจขนาดเล็กไปจนถึงขนาดกลาง
          ด้วยการเชื่อมต่อและช่วยเหลือร้านค้าให้เติบโตและประสบความสำเร็จในโลกธุรกิจ
          Kaidow พร้อมเป็นคำตอบเดียวของร้านอาหาร ด้วยระบบครบวงจรที่ให้บริการทั้ง
          Kaidow POS และ Kaidow Manager และ Kaidow Staff
          ซึ่งถูกออกแบบมาเพื่อช่วยเหลือธุรกิจอาหารทุกรูปแบบตั้งแต่เริ่มต้นกิจการ
          การบริหารจัดการร้าน ตลอดจนเติบโตอย่างมีประสิทธิภาพ
          <br />
          <br />
          <br />
          <br />
        </p>
        <img
          src="https://ocha.in.th/assets/img/about/content/who-we-are.png"
          width={500}
          class="align-right slide-in"
        />
        <h3>เราทำอะไร</h3>
        <p>
          ระบบ POS ของเรา ให้บริการครบทุกเรื่องการจัดการร้านอาหารในระบบเดียว
          ตั้งแต่การรับออเดอร์ การรับเงิน ไปจนถึงติดตามยอดขาย สรุปรายรับรายจ่าย
          จัดการสินค้าคงคลังและพนักงาน
          ไม่ว่าจะการบริหารจัดการหน้าร้านหรือระบบหลังร้าน Kaidow
          ก็ตอบโจทย์ทุกความต้องการของร้านคุณ ระบบของเรา
          ถูกออกแบบมาให้เข้าถึงง่าย ราคาจับต้องได้ มีหลากหลายฟังก์ชัน
          แต่ในขณะเดียวกันก็ใช้งานได้แบบไม่ซับซ้อน
          <br />
          <br />
          <br />
          <br />
          <br />
        </p>
        <img
          src="https://s.isanook.com/ns/0/ud/1495/7477270/news15.jpg"
          width={450}
          class="align-left slide-in"
        />
        <h3>เป้าหมายและวิสัยทัศน์ของเรา</h3>
        <p>
          Kaidow
          มีความเชื่ออย่างยิ่งในการนำเทคโนโลยีเข้ามาเพิ่มอำนาจและพัฒนาธุรกิจขนาดเล็กและขนาดกลางให้ดียิ่งขึ้น
          ในฐานะผู้ให้บริการระบบจัดการร้านอาหารมืออาชีพ Kaidow
          หวังที่จะขยายระบบเพื่อช่วยทำลายกำแพงการเข้าแข่งขันในตลาดของธุรกิจขนาดเล็กและขนาดกลางและกลายเป็นแพลทฟอร์มอันดับหนึ่งของภูมิภาค
          <br />
        </p>
      </div>
      <Footer />
    </div>
  );
};
export default MyInfo;
