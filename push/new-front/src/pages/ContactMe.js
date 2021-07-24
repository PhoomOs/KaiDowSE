import { Button, Card, Grid, TextField, Typography } from '@material-ui/core'
import React from 'react'
import Footer from '../components/Footer'
import { useGoogleMaps } from "react-hook-google-maps";
import '../collection/myinfo.css'

const ContactMe=()=>{
    const { ref, map, google } = useGoogleMaps(
         'AIzaSyCQ6sae__tqJiqQ799884NmADTUGK5uF8w',
        {
          center: { lat: 13.121216955296568, lng: 100.91919909733527 },
          zoom: 18,
        },
      );
    return (
        <div>
            <header class='header' style={{fontSize:50,fontWeight:600}}>ติดต่อเรา</header>
            <div class="site-contact">
                <Grid container>
                    <Grid item sm={6}>
                        <Typography style={{fontSize:18,fontWeight:500}}>ทางเรายินดีที่จะร่วมเป็นส่วนหนึ่งในธุรกิจของท่าน<br/>รบกวนกรอกข้อมูลร้านเพื่อให้ทีมงานติดต่อกลับภายใน 3-5 วันทำการ</Typography>
                        <TextField variant="outlined" label="ชื่อ-นามสกุล" required style={{marginTop:'5%',paddingRight:'20%'}} fullWidth/>
                        <TextField variant="outlined" label="เบอร์โทร" required style={{marginTop:'5%',paddingRight:'20%'}} fullWidth/>
                        <TextField variant="outlined" label="ชื่อร้าน" required style={{marginTop:'5%',paddingRight:'20%'}} fullWidth/>
                        <TextField variant="outlined" label="ประเภทของร้าน" required style={{marginTop:'5%',paddingRight:'20%'}} fullWidth/>
                        <TextField variant="outlined" label="ที่อยู่ติดต่อ" multiline rows={4} required style={{marginTop:'5%',paddingRight:'20%',height:'20%'}} fullWidth/>
                        <Button variant='contained' style={{backgroundColor:'#ffd107',color:'white',fontWeight:600,left:'70%',marginTop:'10%'}}>ส่งข้อมูล</Button>
                    </Grid>
                    <Grid item sm={6} style={{paddingLeft:'15%'}}>
                    <Typography style={{fontSize:20,fontWeight:600,marginTop:'5%'}}>ที่อยู่สำนักงาน</Typography>
                    <Typography style={{fontSize:18,fontWeight:500,marginTop:'10%'}}>199 หมู่ 6 ถนนสุขุมวิท<br/>ตำบลทุ่งสุขลา อำเภอศรีราชา จังหวัดชลบุรี 20230</Typography>
                    <div ref={ref} style={{marginTop:'5%', height: '350px', width: '350px' }}/>
                    </Grid>
                </Grid>
            </div>
            <Footer/>
        </div>
    )
}
export default ContactMe