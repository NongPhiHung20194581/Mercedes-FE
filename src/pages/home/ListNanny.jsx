import * as React from 'react';

import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GradeIcon from '@mui/icons-material/Grade';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';

import AddLocationIcon from '@mui/icons-material/AddLocation';
import axios from 'axios';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import GTranslateIcon from '@mui/icons-material/GTranslate';

import { Link } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TranslateIcon from '@mui/icons-material/Translate';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Cook from './img/cook.png';
import Child from './img/child.png';

import Avatar from '@mui/material/Avatar';

import { AuthContext } from '../../context/AuthContext';
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const marks = [
    {
        value: 100000,
        label: '100,000',
    },
    {
        value: 1000000,
        label: '1,000,000',
    },
    {
        value: 2500000,
        label: '2,500,000',
    },
];

function valuetext(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const postData = async (url, data) => {
    return axios
        .post(url, data)
        .then((response) => {
            console.log(response);
            return response.data;
        })
        .catch((error) => {
            console.error(error);
        });
};

const language = [
    { name: 'Vietnamese', value: 'Vietnamese', active: false },
    { name: 'English', value: 'English', active: false },
    { name: 'Japanese', value: 'Japanese', active: false },
    { name: 'French', value: 'French', active: false },
    { name: 'Spanish', value: 'Spanish', active: false },
    { name: 'Chinese', value: 'Chinese', active: false },
];
const cooking = [
    { name: 'Not required', value: 'non', active: false },
    { name: '1 year', value: '1 year', active: false },
    { name: '2 years', value: '2 years', active: false },
    { name: '3 years', value: '3 years', active: false },
    { name: '> 3 years', value: '> 3 years', active: false },
];
const childCare = [
    { name: 'Not required', value: 'non', active: false },
    { name: '1 year', value: '1 year', active: false },
    { name: '2 years', value: '2 years', active: false },
    { name: '3 years', value: '3 years', active: false },
    { name: '> 3 years', value: '> 3 years', active: false },
];
const price = [
    { name: '200,000 VND', value: 200000, active: false },
    { name: '300,000 VND', value: 300000, active: false },
    { name: '500,000 VND', value: 500000, active: false },
    { name: '700,000 VND', value: 700000, active: false },
    { name: '900,000 VND', value: 900000, active: false },
];

const getActiveNames = (array) => {
    return array.filter((item) => item.active === true).map((item) => item.value);
};

export default function ListNanny() {
    const [filter, setFilter] = React.useState(false);
    const [nannys, setNannys] = React.useState([]);
    const [languages, setLanguages] = React.useState(language);
    const [cookings, setCookings] = React.useState(cooking);
    const [childCares, setChildCares] = React.useState(childCare);
    const [prices, setPrices] = React.useState(price);
    const [reload, setReload] = React.useState(0);
    const { userId, updated } = React.useContext(AuthContext);
    const isLogin = localStorage.getItem('isLogin');

    React.useEffect(() => {
        if (isLogin) {
            handleFilterFromProfile();
        } else {
            console.log(userId, updated);

            const fetchData = async () => {
                const reponse = await fetch(
                    'https://babybuddies-be-dev.onrender.com/api/v1/home?fbclid=IwAR0YWt_3e9gKOT4E6uDFFe5aQl4lZ6GMheji7DLbuXTORu1V2j5x8JUrDQQ',
                );
                const reponseJSON = await reponse.json();
                setNannys(reponseJSON.result.staffs);
            };
            fetchData();
        }
    }, [reload]);

    // Tính tuổi
    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const handleFilterFromProfile = () => {
        const languageF = localStorage.getItem('language');
        const cookingF = localStorage.getItem('cooking') + ' years';
        const childCareF = localStorage.getItem('childCare') + ' years';

        let formData = {
            // rating: rating,
            userLanguage: languageF?.length === 1 ? languageF[0] : languageF,
            cookExp: cookingF.length === 1 ? cookingF[0] : cookingF,
            careExp: childCareF.length === 1 ? childCareF[0] : childCareF,
        };
        console.log(formData);
        if (languageF?.length === 0) {
            delete formData.userLanguage;
        }

        if (cookingF.length === 0) {
            delete formData.cookExp;
        }

        if (childCareF.length === 0) {
            delete formData.careExp;
        }

        postData('https://babybuddies-be-dev.onrender.com/api/v1/search/matching', formData)
            .then((data) => {
                console.log(data);
                setFilter(false);
                setNannys(data);
            })
            .catch((error) => console.error(error));
        // console.log(language, rating, experience, salary);
    };

    const handleFilter = () => {
        const languageF = getActiveNames(languages);
        const cookingF = getActiveNames(cookings);
        const childCareF = getActiveNames(childCares);
        const priceF = getActiveNames(prices);
        let formData = {
            // rating: rating,
            userLanguage: languageF.length === 1 ? languageF[0] : languageF,
            cookExp: cookingF.length === 1 ? cookingF[0] : cookingF,
            careExp: childCareF.length === 1 ? childCareF[0] : childCareF,
            salary: priceF.length === 1 ? priceF[0] : priceF,
        };
        console.log(formData);
        if (languageF.length === 0) {
            delete formData.userLanguage;
        }

        if (cookingF.length === 0) {
            delete formData.cookExp;
        }

        if (childCareF.length === 0) {
            delete formData.careExp;
        }

        if (priceF.length === 0) {
            delete formData.salary;
        }

        postData('https://babybuddies-be-dev.onrender.com/api/v1/search/matching', formData)
            .then((data) => {
                console.log(data);
                setFilter(false);
                setNannys(data);
            })
            .catch((error) => console.error(error));
        // console.log(language, rating, experience, salary);
    };

    //lấy tên từ họ tên
    function getFirstName(fullName) {
        // Tách chuỗi thành mảng các từ
        var nameArray = fullName.split(' ');

        // Lấy phần tử cuối cùng trong mảng là tên
        var firstName = nameArray[nameArray.length - 1];

        return firstName;
    }

    function getCity(address) {
        // Tách chuỗi thành mảng các phần tử
        var addressArray = address.split(',');

        // Lấy phần tử thứ 3 trong mảng là thành phố
        var district = addressArray[addressArray.length - 2];
        var city = addressArray[addressArray.length - 1];
        var result = district.concat(',', city);
        return result;
    }

    // tính số sao trung bình
    function calculateAverageRating(reviews) {
        var totalStars = 0;
        var totalReviews = reviews.length;

        for (var i = 0; i < totalReviews; i++) {
            totalStars += reviews[i].star;
        }

        var averageRating = totalStars / totalReviews;
        if (totalReviews === 0) return 0;
        else return averageRating;
    }

    function roundNumber(number) {
        return Math.round(number * 10) / 10;
    }

    function removeCommaAtStartAndEnd(sentence) {
        let result = sentence.trim(); // Xóa khoảng trắng ở đầu và cuối chuỗi
        if (result.startsWith(',')) {
            result = result.slice(1); // Xóa dấu chấm (,) ở đầu chuỗi
        }
        if (result.endsWith(',')) {
            result = result.slice(0, -1); // Xóa dấu chấm (,) ở cuối chuỗi
        }
        return result;
    }

    // format số tiền 100000 => 100,000
    function formatNumber(number) {
        const formattedNumber = number.toLocaleString('en-US');
        return formattedNumber;
    }

    //pagination
    // const data = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

    const ItemsPerPage = 8;

    const [currentPage, setCurrentPage] = React.useState(1);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * ItemsPerPage;
    const endIndex = startIndex + ItemsPerPage;
    const currentItems = nannys.slice(startIndex, endIndex);

    // if (!nannys) return null;
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            {filter ? (
                <Typography
                    component="div"
                    sx={{
                        position: 'fixed',
                        top: '100px',
                        right: '20px',
                        bottom: '0',
                        width: '28vw',
                        // backgroundColor: 'rgba(41, 137, 66, 0.7)',
                        height: 'min-content',
                        zIndex: '1000',
                        backgroundColor: 'white',
                        border: '1px solid #a4a4a4',
                        borderRadius: '20px',
                    }}
                >
                    <Box paddingBottom={'50px'} paddingLeft={'20px'}>
                        <Typography
                            component="h3"
                            sx={{
                                fontSize: '30px',
                                color: 'black',
                                fontWeight: '700',
                                marginLeft: '24px',
                                marginTop: '14px',
                                marginBottom: '8px',
                            }}
                        >
                            Interests
                        </Typography>

                        <Typography component="div">
                            <Button
                                size="small"
                                sx={{
                                    width: '136px',
                                    borderRadius: '16px',
                                    backgroundColor: '#ebebeb',
                                    color: '#a744be',
                                    marginLeft: '14px',
                                }}
                                startIcon={<TranslateIcon sx={{ color: '#a744be' }} />}
                            >
                                Language
                            </Button>
                            <Box margin={'10px'} display={'flex'} width={'100%'} flexWrap={'wrap'}>
                                {languages.map((item, key) => {
                                    return (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            key={key}
                                            sx={{
                                                borderRadius: '16px',
                                                color: 'black',
                                                width: '25%',
                                                margin: '6px 10px',
                                                textTransform: 'none',
                                                borderColor: item?.active ? 'black' : '#abaeb1',
                                            }}
                                            startIcon={
                                                <CheckCircleRoundedIcon
                                                    sx={{
                                                        color: 'primary.main',
                                                        display: item?.active ? 'flex' : 'none',
                                                    }}
                                                />
                                            }
                                            onClick={() => {
                                                setLanguages((prevItems) =>
                                                    prevItems.map((item, index) =>
                                                        index === key ? { ...item, active: !item.active } : item,
                                                    ),
                                                );
                                            }}
                                        >
                                            {item?.name}
                                        </Button>
                                    );
                                })}
                            </Box>
                        </Typography>

                        <Typography component="div">
                            <Button
                                size="small"
                                sx={{
                                    width: '136px',
                                    borderRadius: '16px',
                                    backgroundColor: '#ebebeb',
                                    color: '#ff6624',
                                    marginLeft: '14px',
                                }}
                                startIcon={<OutdoorGrillIcon sx={{ color: '#ff6624' }} />}
                            >
                                Cooking
                            </Button>
                            <Box margin={'10px'} display={'flex'} flexWrap={'wrap'}>
                                {cookings.map((item, key) => {
                                    return (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            key={key}
                                            sx={{
                                                borderRadius: '16px',
                                                color: 'black',
                                                width: '25%',
                                                margin: '6px 10px',
                                                textTransform: 'none',
                                                borderColor: item?.active ? 'black' : '#abaeb1',
                                            }}
                                            startIcon={
                                                <CheckCircleRoundedIcon
                                                    sx={{
                                                        color: 'primary.main',
                                                        display: item?.active ? 'flex' : 'none',
                                                    }}
                                                />
                                            }
                                            onClick={() => {
                                                setCookings((prevItems) =>
                                                    prevItems.map((item, index) => ({
                                                        ...item,
                                                        active: index === key ? true : false,
                                                    })),
                                                );
                                            }}
                                        >
                                            {item?.name}
                                        </Button>
                                    );
                                })}
                            </Box>
                        </Typography>

                        <Typography component="div">
                            <Button
                                size="small"
                                sx={{
                                    width: '136px',
                                    borderRadius: '16px',
                                    backgroundColor: '#ebebeb',
                                    color: 'primary.main',
                                    marginLeft: '14px',
                                }}
                                startIcon={<ChildFriendlyIcon sx={{ color: 'primary.main' }} />}
                            >
                                Childcare
                            </Button>
                            <Box margin={'10px'} display={'flex'} flexWrap={'wrap'}>
                                {childCares.map((item, key) => {
                                    return (
                                        <Button
                                            variant="outlined"
                                            key={key}
                                            size="small"
                                            sx={{
                                                borderRadius: '16px',
                                                color: 'black',
                                                width: '25%',
                                                margin: '6px 10px',
                                                textTransform: 'none',
                                                borderColor: item?.active ? 'black' : '#abaeb1',
                                            }}
                                            startIcon={
                                                <CheckCircleRoundedIcon
                                                    sx={{
                                                        color: 'primary.main',
                                                        display: item?.active ? 'flex' : 'none',
                                                    }}
                                                />
                                            }
                                            onClick={() => {
                                                setChildCares((prevItems) =>
                                                    prevItems.map((item, index) => ({
                                                        ...item,
                                                        active: index === key ? true : false,
                                                    })),
                                                );
                                            }}
                                        >
                                            {item?.name}
                                        </Button>
                                    );
                                })}
                            </Box>
                        </Typography>

                        <Typography component="div">
                            <Button
                                size="small"
                                sx={{
                                    width: '136px',
                                    borderRadius: '16px',
                                    backgroundColor: '#ebebeb',
                                    color: '#b70f0a',
                                    marginLeft: '14px',
                                }}
                                startIcon={<AttachMoneyIcon sx={{ color: '#b70f0a' }} />}
                            >
                                Price
                            </Button>
                            <Box margin={'10px'} display={'flex'} flexWrap={'wrap'}>
                                {prices.map((item, key) => {
                                    return (
                                        <Button
                                            variant="outlined"
                                            key={key}
                                            size="small"
                                            sx={{
                                                borderRadius: '16px',
                                                color: 'black',
                                                width: '26%',
                                                margin: '6px 10px',
                                                paddingRight: '15px',
                                                borderColor: item?.active ? 'black' : '#abaeb1',
                                                fontSize: '12px',
                                            }}
                                            startIcon={
                                                <CheckCircleRoundedIcon
                                                    sx={{
                                                        color: 'primary.main',
                                                        opacity: item?.active ? '1' : '0',
                                                    }}
                                                />
                                            }
                                            onClick={() => {
                                                setPrices((prevItems) =>
                                                    prevItems.map((item, index) => ({
                                                        ...item,
                                                        active: index === key ? true : false,
                                                    })),
                                                );
                                            }}
                                        >
                                            {item?.name}
                                        </Button>
                                    );
                                })}
                            </Box>
                        </Typography>

                        <Typography component="div" sx={{ float: 'right', marginRight: '14px' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: '20px',
                                    padding: '3px 20px',
                                    marginLeft: '20px',
                                    textTransform: 'none',
                                }}
                                onClick={handleFilter}
                            >
                                Submit
                            </Button>
                            <Button
                                onClick={() => {
                                    setFilter(false);
                                    setCookings(cooking);
                                    setLanguages(language);
                                    setChildCares(childCare);
                                    setPrices(price);
                                    setReload(reload + 1);
                                }}
                                variant="contained"
                                sx={{
                                    borderRadius: '20px',
                                    padding: '3px 20px',
                                    backgroundColor: '#929292',
                                    border: 'none',
                                    ml: 4,
                                    textTransform: 'none',
                                    ':hover': { backgroundColor: 'red' },
                                }}
                            >
                                Cancel
                            </Button>
                        </Typography>
                    </Box>
                </Typography>
            ) : (
                ''
            )}
            <main>
                <Container sx={{ py: 2 }} maxWidth="lg">
                    <Box display={'flex'} height={'64px'} justifyContent={'space-between'}>
                        <Typography
                            variant="h4"
                            sx={{ paddingTop: 8, marginLeft: 4 }}
                            color={'#137913'}
                            fontWeight="bold"
                        >
                            Staff一覧
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <IconButton
                                sx={{ marginRight: 8, marginTop: 12 }}
                                onClick={(e) => {
                                    setFilter(true);
                                }}
                            >
                                {!filter ? (
                                    <FilterAltIcon sx={{ width: '48px', height: '48px', color: '#1d9a1d' }} />
                                ) : (
                                    ''
                                )}
                            </IconButton>
                        </Box>
                    </Box>
                    {/* End hero unit */}
                    <Grid
                        container
                        spacing={2}
                        paddingTop={6}
                        paddingRight={6}
                        paddingLeft={4}
                        paddingBottom={3}
                        borderRadius={5}
                        border="1px solid #1d9a1d"
                    >
                        {currentItems &&
                            currentItems.map((nanny) => (
                                <Grid item key={nanny.id} xs={12} sm={6} md={3}>
                                    <Link href={`/details/${nanny.id}`} underline="none">
                                        <Card
                                            sx={{
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                cursor: 'pointer',
                                                border: '1px solid #1d9a1d',
                                                borderRadius: '10px',
                                                backgroundColor: '#F8F8F8',
                                            }}
                                        >
                                            <Box>
                                                <CardMedia
                                                    component="div"
                                                    sx={{
                                                        pt: '56.25%',
                                                        overflow: 'hidden',
                                                        border: '1px solid #1d9a1d',
                                                        borderRadius: '10px',
                                                        margin: '10px',
                                                    }}
                                                    image={nanny.image_link}
                                                />
                                            </Box>
                                            <CardContent sx={{ flexGrow: 1, textAlign: 'left' }} color="#063706">
                                                <Typography
                                                    variant="h5"
                                                    component="h2"
                                                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                                                    color={'#137913'}
                                                >
                                                    <Typography fontWeight="bold" sx={{ fontSize: '20px' }}>
                                                        {getFirstName(nanny.full_name)}, {getAge(nanny.birthday)}
                                                    </Typography>

                                                    <Typography sx={{ display: 'flex' }} fontWeight="bold">
                                                        <Typography fontWeight="bold" sx={{ fontSize: '18px' }}>
                                                            {roundNumber(calculateAverageRating(nanny.rating))}
                                                        </Typography>
                                                        <GradeIcon />
                                                    </Typography>
                                                </Typography>
                                                <Typography
                                                    color={'#10a710'}
                                                    display="flex"
                                                    justifyContent="space-between"
                                                >
                                                    <Typography color={'#10a710'} sx={{ display: 'flex' }}>
                                                        <Avatar
                                                            alt="Avatar"
                                                            src={Child}
                                                            sx={{ width: 20, height: 20 }}
                                                        />
                                                        <Typography marginLeft={1}> {nanny.care_exp}</Typography>
                                                    </Typography>
                                                    <Typography color={'#10a710'} sx={{ display: 'flex' }}>
                                                        <Avatar
                                                            alt="Avatar"
                                                            src={Cook}
                                                            sx={{ width: 20, height: 20 }}
                                                        />

                                                        <Typography marginLeft={1}>{nanny.cook_exp}</Typography>
                                                    </Typography>
                                                </Typography>

                                                <Typography color={'#10a710'} display="flex">
                                                    <GTranslateIcon sx={{ fontSize: 18 }} />
                                                    {nanny.user_language ? (
                                                        nanny.user_language.map((language) => (
                                                            <Typography marginLeft={1} key={language.id}>
                                                                {/* {language.name}, */}
                                                                {removeCommaAtStartAndEnd(language.name + ',')}
                                                            </Typography>
                                                        ))
                                                    ) : (
                                                        <Typography marginLeft={1}>
                                                            {nanny.user_language_names}
                                                        </Typography>
                                                    )}
                                                </Typography>

                                                <Typography color={'#10a710'} sx={{ fontSize: '14px' }} display="flex">
                                                    <AddLocationIcon sx={{ fontSize: 18 }} />
                                                    <Typography marginLeft={1}>{getCity(nanny.address)}</Typography>
                                                </Typography>
                                                <Typography
                                                    display="flex"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                >
                                                    <Typography color={'#000000'} fontWeight="bold">
                                                        {formatNumber(nanny.salary)} VND/day
                                                    </Typography>

                                                    {
                                                        (isNaN(parseFloat(nanny.matching_score)) || (parseFloat(nanny.matching_score) == 0))  &&
                                                        (
                                                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                                        <CircularProgress
                                                            variant="determinate"
                                                            // value={20}
                                                            value={
                                                                parseFloat(nanny.matching_score)
                                                            }
                                                            sx={{ color: 'red' }}
                                                        />
                                                        <Box
                                                            sx={{
                                                                top: 0,
                                                                left: 0,
                                                                bottom: 0,
                                                                right: 0,
                                                                position: 'absolute',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="caption"
                                                                component="div"
                                                                color="black"
                                                                fontWeight="bold"
                                                            >
                                                                {`${Math.round(
                                                                    parseFloat(
                                                                        parseFloat(nanny.matching_score),
                                                                    ),
                                                                )}%`}
                                                            </Typography>
                                                        </Box>
                                                        </Box>
                                                        )
                                                    }

                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </Grid>
                            ))}
                    </Grid>

                    <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
                        <Pagination
                            count={Math.ceil(nannys.length / ItemsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                        />
                    </Stack>
                </Container>
            </main>
        </ThemeProvider>
    );
}
