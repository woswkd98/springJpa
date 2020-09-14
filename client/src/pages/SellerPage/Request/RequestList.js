import React, { useState, useEffect,useCallback } from 'react';
import Request from './Request';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import SortButton from './SortButton';
import { Typography, Chip } from '@material-ui/core';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingBottom: theme.spacing(4),
        margin: 'auto',
    },
    loadingStyle: {
        display: 'block',
        margin: '10% auto',
    },
    tagStyle: {
        marginRight: '4px',
    }

}));


const RequestList = ({ category }) => {
    const classes = useStyles();

    const [page, setPage] = useState(1);

    const [data, setData] = useState([]);
    console.log(category);
    const [loading, setLoading] = useState(true);
    const size = 6;
    const getAllRequests = useCallback(() => {
        Axios.get('/requests/category/' + category + "/" + (page - 1) + "/" + size)
            .then(res => {
                let requests = res.data.requestList;
                const tags = res.data.tags;
                let count =0;
                requests = requests.filter(element => {
                    console.log("111111111111111111111");
                    console.log(element.state);
                    element.tags = tags[count++];
                    console.log(element);
                    if("요청 시간 마감" === element.state) {
                        return 0;
                    }
                    if("취소된 거래" === element.state) {
                        return 0;
                    }

                    if("거래 완료" === element.state) {
                        return 0;
                    }

                    return 1;
                });

                console.log(res.data);
                setData(requests);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
    },[category,page])

    useEffect(() => {
        getAllRequests();
        return () => {
            setLoading(true);
        }
    }, [getAllRequests])

    const [tags, setTags] = useState([]);

    const tagSort = tags.map((obj, index) => {
        return <Chip className={classes.tagStyle} key={index} label={obj} variant="default" size="small" onDelete={() => { onClickRemove(index) }} />
    })

    const onClickRemove = (index) => {
        const list = tags.filter((obj, x) => {
            return x !== index;
        })
        setTags(list)
    }


    if (loading) {
        return (
            <CircularProgress className={classes.loadingStyle} />
        )
    }

    const requestList = data.map((obj) => {
        
           
        return (
            <Grid key={obj.request_id} item xs={12} sm={12} md={6}>
                <Request tags={tags} setTags={setTags} data={obj} checked={loading}></Request>
            </Grid>
        )
    })


    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Typography variant="h5" style={{ display: 'inline-block', margin: '0px' }} gutterBottom>{category}</Typography>
            <br />
            <br />
            {tagSort}
            <SortButton category={category} />
            <Grid container spacing={3}>
                {requestList}
            </Grid>
        </Container>
    )


}


export default RequestList;