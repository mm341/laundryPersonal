import React, { useRef } from 'react'
import { Box, Stack, Typography, TextField } from '@mui/material'

import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import OutlinedInput from '@mui/material/OutlinedInput'
import LoadingButton from '@mui/lab/LoadingButton'

import * as Yup from 'yup'
import { useTheme } from '@mui/material'
import resendImg from '../../../../public/LogIn/resendCode.svg'
import AuthModal from '..'
import { useState } from 'react'
import { useEffect } from 'react'


const OtpForm = ({
    // data,
    // formSubmitHandler,
    // isLoading,
    // UpdateProfile,
    // setPhoneVerify,
    // setOpenOtpModal,
}) => {
    const { t } = useTranslation()
    const [otp, setOtp] = useState('')
    const otpFormik = useFormik({
        //here reset_token is otp inputs
        initialValues: {
            reset_token: '',
            // phone: data?.phone,
        },
        validationSchema: Yup.object({
            reset_token: Yup.string().required(t('field is empty')),
        }),
        onSubmit: async (values) => {
            try {
                // formSubmitHandler(values)
            } catch (err) {}
        },
    })
    const [modalFor, setModalFor] = useState('sign-in')
    const theme = useTheme()
    const [authModalOpen, setOpen] = useState(false)
    const handleOpenAuthModal = () => {
        // setOpenOtpModal(false)
    }
    const handleCloseAuthModal = () => {
        setOpen(false)
    }

    const [resend, setResend] = useState(59)

    useEffect(() => {
        const handelTimeOut = setTimeout(() => {
            // setResend((resend -= 1))
        }, 1000)

        if (resend === 0 || resend < 0) {
            clearTimeout(handelTimeOut)
        }
    }, [resend])

    useEffect(() => {
        otpFormik.values.reset_token = otp
    })

    return (
        // <CustomPaperBigCard width="auto" noboxshadow="true">
        //     <CustomStackFullWidth>
        //         <Stack alignItems="center" justifyContent="center">
        //             <Typography
        //                 sx={{
        //                     fontSize: '16px',
        //                     fontWeight: '500',
        //                     color: theme.palette.primary.textLight,
        //                 }}
        //             >
        //                 {t('We send the verification code (OTP) sent to')}
        //             </Typography>
        //             <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
        //                 {data?.phone}
        //             </Typography>
        //         </Stack>
        //         <form noValidate onSubmit={otpFormik.handleSubmit}>
        //             <Stack
        //                 mt="2rem"
        //                 padding="0 20px"
        //                 alignItems="center"
        //                 justifyContent="center"
        //             >
        //                 <Box
        //                     sx={{
        //                         width: {md:'70%',xs:"95%"},
        //                         mx:"auto",
        //                         height: '50px',
        //                         border: `1px solid #B9B9B9`,
        //                         borderRadius: '5px',
        //                         pb: '8px',
        //                         pt: '5px',
        //                         display: 'flex',
        //                         justifyContent: 'center',
        //                         alignItems: 'center',
        //                     }}
        //                 >
        //                     <OtpInput
        //                         // value={otpFormik.values.reset_token}
        //                         onChange={setOtp}
        //                         name="reset_token"
        //                         inputType="tel"
        //                         pattern="[0-9]{4}"
        //                         inputStyle={{
        //                             width: '35px',
        //                             height: '35px',
        //                             borderBottom: '1px solid #B9B9B9',
        //                             borderRight: '0px solid #B9B9B9',
        //                             borderLeft: '0px solid #B9B9B9',
        //                             borderTop: '0px solid #B9B9B9',
        //                         }}
        //                         // InputProps={{
        //                         //     inputMode: 'numeric',
        //                         //     pattern: '[0-9]*',
        //                         //     // readOnly:true
        //                         // }}
        //                         value={otp}
        //                         // onChange={otpFormik.handleChange}
        //                         numInputs={4}
        //                         renderSeparator={<span>-</span>}
        //                         renderInput={(props) => <input {...props} />}
        //                     />
        //                 </Box>

        //                 <Box
        //                     sx={{
        //                         display: 'flex',
        //                         gap: '5px',
        //                         alignItems: 'center',
        //                         mt: '10px',
        //                     }}
        //                 >
        //                     <img
        //                         src={resendImg?.src}
        //                         alt="img"
        //                         loading="lazy"
        //                         style={
        //                             resend === 0
        //                                 ? { cursor: 'pointer' }
        //                                 : { cursor: 'default' }
        //                         }
        //                     />
        //                     <Typography
        //                         sx={{
        //                             fontSize: '14px',
        //                             fontWeight: '600',
        //                             color: theme.palette.primary.textLight,
        //                             display: 'flex',
        //                             alignItems: 'center',
        //                             gap: '2px',
        //                         }}
        //                     >
        //                         Resend code
        //                         <span
        //                             style={
        //                                 resend !== 0
        //                                     ? {
        //                                           color: '#D52116',
        //                                           display: 'flex',
        //                                           gap: '2px',
        //                                           alignItems: 'center',
        //                                       }
        //                                     : { display: 'none' }
        //                             }
        //                         >
        //                             <Typography
        //                                 component={'span'}
        //                                 sx={{
        //                                     fontSize: '14px',
        //                                     fontWeight: '600',
        //                                     color: theme.palette.primary
        //                                         .textLight,
        //                                 }}
        //                             >
        //                                 {' '}
        //                                 on
        //                             </Typography>{' '}
        //                             {resend}
        //                         </span>
        //                     </Typography>
        //                 </Box>
        //                 <Box
        //                     sx={{
        //                         display: 'flex',
        //                         flexDirection: 'column',
        //                         gap: '2px',
        //                     }}
        //                 >
        //                     <LoadingButton
        //                         type="submit"
        //                         fullWidth
        //                         variant="contained"
        //                         sx={{ mt: 3, mb: 2, color: 'white' }}
        //                         loading={isLoading}
        //                     >
        //                         {t('Verify')}
        //                     </LoadingButton>
        //                     {!UpdateProfile && (
        //                         <Box
        //                             sx={{
        //                                 width: '200px',
        //                                 height: '40px',
        //                                 display: 'flex',
        //                                 justifyContent: 'center',
        //                                 alignItems: 'center',
        //                                 border: `1px solid ${theme.palette.primary.main}`,
        //                                 borderRadius: '5px',
        //                                 color: theme.palette.primary.main,
        //                                 cursor: 'pointer',
        //                                 px: '15px',
        //                             }}
        //                             onClick={handleOpenAuthModal}
        //                         >
        //                             Edit Phone Number
        //                         </Box>
        //                     )}
        //                     {UpdateProfile && (
        //                         <Box
        //                             sx={{
        //                                 width: '200px',
        //                                 height: '40px',
        //                                 display: 'flex',
        //                                 justifyContent: 'center',
        //                                 alignItems: 'center',
        //                                 border: `1px solid ${theme.palette.primary.main}`,
        //                                 borderRadius: '5px',
        //                                 color: theme.palette.primary.main,
        //                                 cursor: 'pointer',
        //                                 px: '15px',
        //                             }}
        //                             onClick={() => setPhoneVerify(false)}
        //                         >
        //                             {t('Cancel')}
        //                         </Box>
        //                     )}
        //                 </Box>
        //             </Stack>
        //             <AuthModal
        //                 open={authModalOpen}
        //                 modalFor={modalFor}
        //                 setModalFor={setModalFor}
        //                 handleClose={handleCloseAuthModal}
        //             />
        //         </form>
        //     </CustomStackFullWidth>
        // </CustomPaperBigCard>
        <p>jjj</p>
    )
}
export default OtpForm
