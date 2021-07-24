import React, { Component } from 'react';
import '../collection/home.css';
import { Grid, Typography, Link } from '@material-ui/core';
import kai from '../img/kaidowlogo.png';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <Grid container>
          <Grid item sm={4}>
            <Typography style={{ fontSize: 14, marginTop: 32, marginLeft: 50 }}>
              Kaidow คือแพลทฟอร์มแห่งทางเลือกสำหรับธุรกิจขนาดเล็กไปจนถึงขนาดกลาง
              ด้วยการเชื่อมต่อและช่วยเหลือร้านค้าให้เติบโตและประสบความสำเร็จในโลกธุรกิจ
            </Typography>
          </Grid>
          <Grid item sm={1}>
            <h2 style={{ marginTop: 50, marginLeft: 35 }}>|</h2>
          </Grid>
          <Grid item sm={3}>
            <Typography style={{ fontSize: 14, marginTop: 30 }}>
              ศูนย์บริการลูกค้า: 088-932-5235
              <br />
              จันทร์-ศุกร์: 9.00 - 20.00 น.
              <br />
              เสาร์อาทิตย์และวันหยุดนักขัตฤกษ์: 10.00 - 19.00 น.
            </Typography>
          </Grid>
          <Grid item sm={3}>
            <Typography style={{ marginleft: 20, fontSize: 14, marginTop: 50 }}>
              199 หมู่ 6 ถนนสุขุมวิท
              <br />
              ตำบลทุ่งสุขลา อำเภอศรีราชา จังหวัดชลบุรี 20230
            </Typography>
          </Grid>
          <Grid item sm={1}>
            <img src={kai} style={{ marginTop: 30, height: 64, width: 64 }} />
          </Grid>
          <Grid item sm={12} style={{ marginTop: 30 }}></Grid>
        </Grid>
        <div class="foot">
          <Grid container>
            <Grid item sm={2}></Grid>
            <Grid
              item
              sm={9}
              style={{ fontSize: 12, paddingTop: 20, paddingBottom: 20 }}
            >
              Copyright © Krapow Corp. Trademarks to belong to their respective
              owners. All rights reserved. <Link>เงื่อนไขการให้บริการ</Link> |{' '}
              <Link>นโยบายความเป็นส่วนตัว</Link>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
