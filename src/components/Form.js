import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { React, useState, Fragment } from 'react';
import axios from 'axios';
import DownPaymentList from './DownPaymentList';
import { FormHelperText } from '@material-ui/core';



function Form() {

    const [open, setOpen] = useState(false);
    const [bAmount, setBAmount] = useState(0);
    const [rate, setRate] = useState(0);
    const [expDate, setExprDate] = useState(" ");
    const [balanceDate, setBalanceDate] = useState(" ");
    const [dateFirstPay, setDateFirstPay] = useState(" ");
    const [list, setList] = useState([])


    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    function resetForm() {
        setBAmount(0)
        setRate(0)
        setExprDate(" ")
        setBalanceDate(" ")
        setDateFirstPay(" ")
    }

    //handle submit of POST request
    function handleSubmit() {


        //validation
        if (bAmount === (null || 0)) {
            alert('Lånebeløp må fylles ut')
        }

        if (expDate === (" ")) {
            alert('Utløpsdato må fylles ut')
        } else if (expDate.length < 10) {
            alert('Vennligst fyll ut datoen riktig: YYYY-MM-DD')
        }

        if (balanceDate === (" ")) {
            alert('Saldo dato må fylles ut')
        } else if (balanceDate.length < 10) {
            alert('Vennligst fyll ut datoen riktig: YYYY-MM-DD')
        }

        if (dateFirstPay === (" ")) {
            alert('Dato for første innbetaling må fylles ut')
        } else if (dateFirstPay.length < 10) {
            alert('Vennligst fyll ut datoen riktig: YYYY-MM-DD')
        }

        //Set up for post request
        const options = {
            method: 'POST',
            url: 'https://visningsrom.stacc.com/dd_server_laaneberegning/rest/laaneberegning/v1/nedbetalingsplan',
            headers: { 'Content-type': 'application/json' },
            data: {
                laanebelop: bAmount,
                nominellRente: rate,
                terminGebyr: 30,
                utlopsDato: expDate,
                saldoDato: balanceDate,
                datoForsteInnbetaling: dateFirstPay,
                ukjentVerdi: "TERMINBELOP"

            }
        }

        //send the post request and log the response data
        axios(options).then((response) => {
            setList(list.concat([response.data.nedbetalingsplan.innbetalinger]))
        }).catch(function (error) {
            console.log(error)
        });

        /**
         * []
         * [plan1]
         * [plan1] + [nyPlan] = [plan1, nyPlan]
         * [plan1, nyPlan] + [nyPlan2] = [plan1, nyPlan, nyPlan2]
         * ....
         */

        resetForm()
        handleClose()
    }

    return (
        
        //Modal window by using material ui bootstrap
        //returning a fragment because it takes care of multiple component.
        //Chose the Dialog because it has the necessary property i need
        <Fragment>
            <Button onClick={handleClickOpen} color="primary">
                Legg til nedbetalingsplan
             </Button>
            <Dialog open={open} >
                <DialogTitle >Legg til ny plan</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Vennligs fyll ut skjemaet nedenfor
                    </DialogContentText>
                    <TextField
                        required
                        label="Lånebeløp"
                        value={bAmount}
                        onChange={e => setBAmount(e.target.value)}
                    />
                    <br />
                    <TextField
                        label="Rente"
                        placeholder="Valgfritt"
                        value={rate}
                        onChange={e => setRate(e.target.value)}
                    />
                    <br />
                    <TextField
                        required
                        label="Utløpsdato"
                        placeholder="YYYY-MM-DD"
                        value={expDate}
                        onChange={e => setExprDate(e.target.value)}
                    />
                    <FormHelperText>Må fylle dato ut på denne måten: YYYY-MM-DD | eks: 2020-12-01</FormHelperText>
                    <br />
                    <TextField
                        required
                        label="SaldoDato"
                        value={balanceDate}
                        placeholder="YYYY-MM-DD"
                        onChange={e => setBalanceDate(e.target.value)}
                    />
                    <FormHelperText>Må fylle dato ut på denne måten: YYYY-MM-DD | eks: 2020-12-01</FormHelperText>
                    <br />
                    <TextField
                        required
                        label="Dato ved første innbetaling"
                        placeholder="YYYY-MM-DD"
                        value={dateFirstPay}
                        onChange={e => setDateFirstPay(e.target.value)}
                    />
                    <FormHelperText>Må fylle dato ut på denne måten: YYYY-MM-DD | eks: 2020-12-01</FormHelperText>
                    <br />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Avbryt
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Legg til ny plan
                    </Button>
                </DialogActions>
            </Dialog>
            <DownPaymentList list={list} />
        </Fragment>



    )
}
export default Form;