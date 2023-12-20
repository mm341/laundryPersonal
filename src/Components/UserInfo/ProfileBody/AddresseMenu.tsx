import {
    Box,
    Grid,
    IconButton,
    ListItem,
    ListItemText,
    Radio,
    Stack,
    Typography,
} from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import deletePhoto from '../../../../public/profile/deleteImg.svg'
import editPhoto from '../../../../public/profile/editImage.svg'
import { useTheme } from '@mui/material/styles'
import { useMutation } from 'react-query'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import markerIcon from '../../../../public/orders/home.svg'
import { CustomPaperBigCard, CustomStackFullWidth } from '@/styles/PublicStyles'
const AddresseMenu = ({
    // data,
    // defaultAddresse,
    // refetch,
    // setIdRequest,
    // action,
    // changeLocation,
    // setAddresse,
    // checkout,
    // handlePickLocationFromAddresse,
    // handelClose,
    // setAddresseId,
    // restaurantZone,
}) => {
    const [item, setItem] = useState()
    const [open, setOpen] = React.useState(false)
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
    const [zoneError, setZoneError] = useState(false)
    // const [id, setId] = useState(action)

    // const [idDelete, setIdDelete] = useState(action)

    // useEffect(() => {
    //     if (!changeLocation) {
    //         setIdRequest(id)
    //     }
    // }, [id, changeLocation])
    // useEffect(() => {
    //     if (action) {
    //         setId(action)
    //     }
    // }, [action])
    // useEffect(() => {
    //     if (changeLocation) {
    //         setAddresse(defaultAddresse[0])
    //     }
    // }, [changeLocation, defaultAddresse])

    // useEffect(() => {
    //     if (zoneError) {
    //         toast.error(t('Sorry,addresse is out of Restaurant Delivery Zone'))
    //         setZoneError(false)
    //     }
    // }, [zoneError])
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const theme = useTheme()
    const { t } = useTranslation()
    // const {
    //     mutate: defaultMutation,
    //     isLoading,
    //     error,
    // } = useMutation(AddressApi.updateDefaultAddress, {
    //     onSuccess: () => {
    //         toast.success(t('Addresse changed successfully.'))
    //         handelClose()
    //         refetch()
    //     },
    //     onError: onErrorResponse,
    // })
    // const setDefaultAddredd = (addressId) => {
    //     if (changeLocation) {
    //         localStorage.setItem('zoneid', JSON.stringify(addressId?.zone_ids))
    //     }

    //     defaultMutation({ address_id: addressId?.id })
    // }

    return (
        <Grid container spacing={1.5}>
            {/* <Grid item xs={12} md={12}>
                {data?.data?.addresses?.length > 0 && (
                    <CustomPaperBigCard>
                        {data?.data?.addresses?.map((adres, index:number) => (
                            <React.Fragment key={index}>
                                <ListItem
                                    alignItems="flex-start"
                                    sx={{
                                        cursor: 'pointer',
                                        backgroundColor: 'white',
                                        my: '10px',
                                    }}
                                    selected={adres.id === id}
                                >
                                    <CustomStackFullWidth
                                        sx={{
                                            display: 'flex',
                                            flexDirection: {
                                                sm: 'row',
                                                xs: 'column',
                                            },
                                        }}
                                        alignItems="center"
                                    >
                                        <Radio
                                            onClick={() => {
                                                if (changeLocation) {
                                                    if (
                                                        adres?.zone_ids
                                                            ?.length > 0
                                                    ) {
                                                        setAddresse(adres)
                                                        handlePickLocationFromAddresse()
                                                        setDefaultAddredd(adres)
                                                    } else {
                                                        toast.error(
                                                            t(
                                                                'Service not available in this area'
                                                            )
                                                        )
                                                    }

                                                    // handelClose()
                                                } else {
                                                    if (
                                                        adres?.zone_ids
                                                            ?.length > 0
                                                    ) {
                                                        if (checkout) {
                                                            adres?.zone_ids?.map(
                                                                (e) => {
                                                                    if (
                                                                        restaurantZone?.includes(
                                                                            Number(
                                                                                e
                                                                            )
                                                                        )
                                                                    ) {
                                                                        setDefaultAddredd(
                                                                            adres
                                                                        )

                                                                        handelClose() &&
                                                                            handelClose()
                                                                        setAddresseId(
                                                                            adres?.id
                                                                        )
                                                                    } else {
                                                                        setZoneError(
                                                                            true
                                                                        )
                                                                    }
                                                                }
                                                            )

                                                            setId(adres?.id)
                                                        }
                                                    } else {
                                                        toast.error(
                                                            t(
                                                                'Service not available in this area'
                                                            )
                                                        )
                                                    }

                                                    setId(adres?.id)
                                                }
                                            }}
                                            checked={
                                                Number(adres.id) === Number(id)
                                            }
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            color={'success'}
                                        />
                                        <ListItemText
                                            secondary={
                                                <Box
                                                    sx={{
                                                        width: '100%',
                                                        display: 'flex',

                                                        justifyContent:
                                                            'space-between',
                                                        alignItems: 'center',
                                                        flexDirection: {
                                                            sm: 'row',
                                                            xs: 'column',
                                                        },
                                                    }}
                                                >
                                                    <Box
                                                        onClick={() => {
                                                            if (
                                                                changeLocation
                                                            ) {
                                                                if (
                                                                    adres
                                                                        ?.zone_ids
                                                                        ?.length >
                                                                    0
                                                                ) {
                                                                    setAddresse(
                                                                        adres
                                                                    )
                                                                    handlePickLocationFromAddresse()
                                                                    setDefaultAddredd(
                                                                        adres
                                                                    )
                                                                } else {
                                                                    toast.error(
                                                                        t(
                                                                            'Service not available in this area'
                                                                        )
                                                                    )
                                                                }
                                                            } else {
                                                                if (
                                                                    adres
                                                                        ?.zone_ids
                                                                        ?.length >
                                                                    0
                                                                ) {
                                                                    if (
                                                                        checkout
                                                                    ) {
                                                                        adres?.zone_ids?.map(
                                                                            (
                                                                                e
                                                                            ) => {
                                                                                if (
                                                                                    restaurantZone?.includes(
                                                                                        Number(
                                                                                            e
                                                                                        )
                                                                                    )
                                                                                ) {
                                                                                    setDefaultAddredd(
                                                                                        adres
                                                                                    )

                                                                                    handelClose() &&
                                                                                        handelClose()
                                                                                    setAddresseId(
                                                                                        adres?.id
                                                                                    )
                                                                                } else {
                                                                                    setZoneError(
                                                                                        true
                                                                                    )
                                                                                }
                                                                            }
                                                                        )

                                                                        setId(
                                                                            adres?.id
                                                                        )
                                                                    }
                                                                } else {
                                                                    toast.error(
                                                                        t(
                                                                            'Service not available in this area'
                                                                        )
                                                                    )
                                                                }

                                                                setId(adres?.id)
                                                            }
                                                        }}
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: {
                                                                sm: 'row',
                                                                xs: 'column',
                                                            },
                                                            alignItems:
                                                                'center',
                                                            gap: '5px',
                                                        }}
                                                    >
                                                        <Typography
                                                            component={'span'}
                                                            sx={{
                                                                fontWeight:
                                                                    '600',
                                                                fontSize:
                                                                    '18px',
                                                            }}
                                                        >
                                                            {
                                                                adres?.address_type
                                                            }
                                                        </Typography>
                                                        {adres.address?.slice(
                                                            0,
                                                            80
                                                        )}
                                                        <Typography
                                                            component={'span'}
                                                            sx={{
                                                                display:
                                                                    adres
                                                                        .address
                                                                        ?.length >
                                                                    80
                                                                        ? 'block'
                                                                        : 'none',
                                                            }}
                                                        >
                                                            ...
                                                        </Typography>
                                                    </Box>
                                                    {!changeLocation && (
                                                        <Stack
                                                            sx={{
                                                                flexDirection:
                                                                    'row',
                                                                alignItems:
                                                                    'center',
                                                                gap: '10px',
                                                            }}
                                                        >
                                                            <IconButton>
                                                                <img
                                                                    onClick={() => {
                                                                        setItem(
                                                                            adres
                                                                        )
                                                                        setOpenUpdateDialog(
                                                                            true
                                                                        )
                                                                    }}
                                                                    src={
                                                                        editPhoto.src
                                                                    }
                                                                    alt="editImg"
                                                                    loading="lazy"
                                                                />
                                                            </IconButton>
                                                            <IconButton
                                                                onClick={() => {
                                                                    setIdDelete(
                                                                        adres?.id
                                                                    )
                                                                    handleOpen()
                                                                }}
                                                            >
                                                                <img
                                                                    src={
                                                                        deletePhoto.src
                                                                    }
                                                                    alt="deleteImg"
                                                                    loading="lazy"
                                                                />
                                                            </IconButton>
                                                        </Stack>
                                                    )}
                                                </Box>
                                            }
                                        />
                                    </CustomStackFullWidth>
                                </ListItem>
                            </React.Fragment>
                        ))}
                    </CustomPaperBigCard>
                )}
            </Grid> */}
            {/* {open && (
                <DeleteAddress
                    open={open}
                    handleClose={handleClose}
                    addressId={idDelete}
                    refetch={refetch}
                />
            )} */}

            {/* {openUpdateDialog && (
                <UpdateAddress
                    markerIcon={markerIcon}
                    refetch={refetch}
                    item={item}
                    openUpdateDialog={openUpdateDialog}
                    setOpenUpdateDialog={setOpenUpdateDialog}
                />
            )} */}
        </Grid>
    )
}

export default AddresseMenu
