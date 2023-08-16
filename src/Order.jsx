import * as React from 'react';
import Grid from '@mui/material/Grid';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import Typography from './modules/components/Typography';
import withRoot from './modules/withRoot';
import { order } from './config/ApiService';
import { Field, Form } from 'react-final-form';
import { Box } from '@mui/system';
import FormButton from './modules/form/FormButton';
import RFTextField from './modules/form/RFTextField';
 
import { required } from './modules/form/validation';
import MenuItem from '@mui/material/MenuItem';
import { useParams } from 'react-router-dom';
import { orderDetail } from './config/ApiService';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

const ORDER_NAME = localStorage.getItem("USER_NAME");
const ORDER_EMAIL = localStorage.getItem("USER_ID");

const location = [
    { label: '선택', value: '-' },
    { label: '동남아시아', value: 'eastasia' },
    { label: '일본', value: 'japan' },
    { label: '유럽', value: 'europe' },
    { label: '미국', value: 'usa' },
]

const person = [
    { label: '선택', value: '-' },
    { label: '1명', value: '1' },
    { label: '2명', value: '2' },
    { label: '3명', value: '3' },
    { label: '4명', value: '4' },
]
 
function Order() { 
    const [sent, setSent] = React.useState(false);
    const params = useParams();
    const orderId = params.orderId;

    const usreRole = localStorage.getItem("USER_ROLE");
    console.log(usreRole);
 
    const {status, data:orders, error} =  useQuery(
            {
                queryKey: ["orderDetail", orderId],
                queryFn: () => orderDetail(orderId)
            }
        
    )
    if (status === "loading") {
        return <span>Loading...</span>;
    }
    
    if (status === "error") {
        return <span>Error: {error.message}</span>;
    }  
 
    const handleSubmit = (values) => {
        order(values)
        .then(
          () => {window.location.href = "/order-list";}
        )
     
        setSent(true); 
    }

    const validate = (values) => {
        const errors = required(['orderLocation', 'orderAdult', 'orderChild', 
                                'startedAt','endedAt', 'orderContent' ], values);     
        return errors;
    }; 

    console.log(orders);
    return (
        <>
        <AppAppBar />
        <AppForm>
            <>
                <Typography variant="h4" gutterBottom marked="center" align="center">
                    여행계획을 작성하세요
                </Typography>
            </>
        <Form
            onSubmit={handleSubmit}
            subscription={{ submitting: true }} 
            validate={validate}
        >
            {({ handleSubmit: handleSubmit2, submitting }) => (
                 <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
                 <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>       
                        <Field 
                            component={RFTextField}
                            disabled
                            fullWidth
                            label="작성자"
                            name="orderName"
                            defaultValue={ORDER_NAME}
                        />  
                    </Grid>
                    <Grid item xs={12} sm={6}>       
                        <Field 
                            component={RFTextField}
                            disabled
                            fullWidth
                            label="author"
                            name="orderEmail"
                            defaultValue={ORDER_EMAIL}
                        />  
                    </Grid>
                    <Grid item xs={12} sm={6}>       
                        <Field 
                            component={RFTextField}
                            disabled={orders?.orderStatus === "pending" || orders === null ? false : true}
                            autoComplete="location"
                            fullWidth
                            label="location"
                            name="orderLocation"
                            required
                            select
                            // helperText="여행지역선택"
                            defaultValue = {orders?.orderLocation ? orders?.orderLocation: "-"}
                        >
                            {
                                location.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                    )
                                )
                            }                         
                        </Field>  
                    </Grid>
                    <Grid item xs={12} sm={3}>                        
                        <Field 
                     
                            component={RFTextField}
                            disabled={orders?.orderStatus === "pending" || orders === null ? false : true}
                            autoComplete="adult"
                            fullWidth
                            label="성인"
                            name="orderAdult"
                            required
                            select
                            // helperText="여행지역선택"
                            defaultValue = {orders?.orderAdult ? orders?.orderAdult: "-"}
                        >
                            {
                                person.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                    )
                                )
                            }                         
                        </Field>    
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Field 
                          
                                component={RFTextField}
                                disabled={orders?.orderStatus === "pending" || orders === null ? false : true}
                                autoComplete="child"
                                fullWidth
                                label="어린이"
                                name="orderChild"
                                required
                                select
                                // helperText="여행지역선택"
                                // defaultValue={"-"}
                                defaultValue = {orders?.orderChild ? orders?.orderChild: "-"}
                            >
                                {
                                    person.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                        )
                                    )
                                }                         
                            </Field>    
                    </Grid>  
                    <Grid item xs={12} sm={6}>
                        <Field 
                          
                                component={RFTextField}
                                disabled={orders?.orderStatus === "pending" || orders === null ? false : true}
                                autoComplete="startedAt"
                                fullWidth
                                label="출발일(YYYY/MM/DD)"
                                name="startedAt"
                                required
                                // helperText="여행지역선택"
                                defaultValue = {orders?.startedAt ? orders?.startedAt: dayjs(new Date()).format('YYYY-MM-DD')}
                        >
                        </Field>    
                    </Grid>    
                    <Grid item xs={12} sm={6}>
                        <Field 
                          
                                component={RFTextField}
                                disabled={orders?.orderStatus === "pending" || orders === null ? false : true}
                                autoComplete="endedAt"
                                fullWidth
                                label="도착일(YYYY/MM/DD)"
                                name="endedAt"
                                required
                                // helperText="여행지역선택"
                                defaultValue = {orders?.endedAt ? orders?.endedAt: dayjs(new Date()).format('YYYY-MM-DD')}
                        >
                        </Field>    
                    </Grid>       
                    <Grid item xs={12} sm={12}>
                        <Field 
                          
                                component={RFTextField}
                                disabled={orders?.orderStatus === "pending" || orders === null ? false : true}
                                autoComplete="orderContent"
                                fullWidth
                                multiline
                                rows={10}
                                label="여행계획"
                                name="orderContent"
                                required
                                helperText="내용을 입력하세요" 
                                defaultValue = {orders?.content ? orders?.content: "-"}
                        >
                        </Field>    
                    </Grid>                              
                </Grid>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker 
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)} 
                            label="출발일" 
                            name="startedDate"
                        />
                        <DatePicker label="도착일" />
                    </DemoContainer>
                </LocalizationProvider>  */}
                <FormButton
                    sx={{ mt: 3, mb: 2 }}
                    size="large"
                    color="secondary"
                    fullWidth
                    disabled={orders?.orderStatus === "pending" || orders === null ? false : true}                    
                >
                    {"등록하기"}
                </FormButton>
            </Box>
            )}
        </Form>
        </AppForm>
        </>

    )
}
 
export default withRoot(Order);