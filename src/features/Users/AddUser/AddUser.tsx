import React, {useRef} from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import NumberFormat from 'react-number-format'
import styles from './AddUser.module.css'
import {Button, TableCell, TableRow, TextField} from '@material-ui/core'

export const AddUser: React.FC = () => {
    const phoneRef = useRef(null)
    const {formState: {errors, isValid, isDirty}, register, control} = useFormContext()

    return (
        <>
            <TableRow className={styles.row}>
                <TableCell align={'center'}>{<TextField error={!!errors.id} label={errors.id && 'Error'}
                                                        helperText={errors.id && errors.id.message}
                                                        autoComplete={'new-password'} type={'number'}
                                                        {...register('id')}/>}
                </TableCell>
                <TableCell align={'center'}>{<TextField error={!!errors.firstName} label={errors.firstName && 'Error'}
                                                        helperText={errors.firstName && errors.firstName.message}
                                                        autoComplete={'new-password'} {...register('firstName')}/>}
                </TableCell>
                <TableCell align={'center'}>{<TextField error={!!errors.lastName} label={errors.lastName && 'Error'}
                                                        helperText={errors.lastName && errors.lastName.message}
                                                        autoComplete={'new-password'} {...register('lastName')}/>}
                </TableCell>
                <TableCell align={'center'}>{<TextField error={!!errors.email} label={errors.email && 'Error'}
                                                        helperText={errors.email && errors.email.message}
                                                        autoComplete={'new-password'}
                                                        type={'email'}
                                                        {...register('email')}/>}
                </TableCell>
                <TableCell align={'center'}>
                    {<Controller
                        control={control}
                        render={({field}) => (
                            <NumberFormat customInput={TextField} error={!!errors.phone} label={errors.phone && 'Error'}
                                          helperText={errors.phone && errors.phone.message}
                                          autoComplete={'new-password'} {...field} ref={phoneRef}
                                          format={'(###)###-####'} mask={' '}/>
                        )}
                        name={'phone'}/>}
                </TableCell>
                <TableCell align={'center'}>
                    <Button disabled={!isValid || isDirty} color={'primary'} variant={'contained'} type="submit">Add to
                        table</Button>
                </TableCell>
            </TableRow>
        </>
    )
}