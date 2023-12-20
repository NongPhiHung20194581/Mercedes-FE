import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StarRateIcon from '@mui/icons-material/StarRate';
import { matchingNannyApi } from '../../api/home.api';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';




const NannyFilter = ({
  setNannies,
  setIsLoading,
  setIsFilter,
  languages, setLanguages,
  cookings, setCookings,
  prices, setPrices,
  ratings, setRatings,
  handleCancelFilter
}) => {
  const marks = [
    {
      value: 100000,
      label: '100000',
    },
    {
      value: 2000000,
      label: '2000000',
    },
  ];
  const [address, setAddress] = useState([
    { name: 'Đống Đa', active: false },
    { name: 'Hai Bà Trưng', active: false },
    { name: 'Cầu Giấy', active: false },
    { name: 'Tây Hồ', active: false },
    { name: 'Thanh Xuân', active: false },
  ]);
  function AirbnbThumbComponent(props) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
      </SliderThumb>
    );
  }
  const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: '#d8d8d8',
    height: 3,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
      height: 10,
      width: 10,
      backgroundColor: 'var(--primary-color)',
      border: '1px solid currentColor',
      '&:hover': {
        boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
      },
    },
    '& .MuiSlider-track': {
      height: 3,
    },
    '& .MuiSlider-rail': {
      color: theme.palette.mode === 'dark' ? 'var(--primary-color)' : '#d8d8d8',
      opacity: theme.palette.mode === 'dark' ? undefined : 1,
      height: 3,
    },
    '& .MuiSlider-valueLabel': {
      fontSize: 12,
      fontWeight: 'normal',
      top: -6,
      backgroundColor: 'unset',
      color: '#fff',
    },
    "& .MuiSlider-markLabel": {
      color: '#fff',  
    }
  }));
  AirbnbThumbComponent.propTypes = {
    children: PropTypes.node,
  };

  const getActiveNames = (array) => {
    return array.filter((item) => item.active === true).map((item) => item.value);
  };

  const handleSubmitFilter = () => {
    const languageF = getActiveNames(languages);
    const cookingF = getActiveNames(cookings);
    const priceF = getActiveNames(prices);
    let formData = {
      // rating: rating,
      userLanguage: languageF.length === 1 ? languageF[0] : languageF,
      cookExp: cookingF.length === 1 ? cookingF[0] : cookingF,
      salary: priceF.length === 1 ? priceF[0] : priceF,
    };

    if (languageF.length === 0) {
      delete formData.userLanguage;
    }

    if (cookingF.length === 0) {
      delete formData.cookExp;
    }

    if (priceF.length === 0) {
      delete formData.salary;
    }

    setIsFilter(false);
    setNannies([]);
    setIsLoading(true);
    matchingNannyApi(formData)
      .then(res => {
        setIsLoading(false)
        setNannies(res.data)
      })
      .catch(err => {
        setIsLoading(false)
      })
  };

  return (
      <Box className = 'newfilback'>
        <Typography
          component="h3"
          sx={{
            fontSize: '30px',
            color: 'white',
            fontWeight: '700',
            marginLeft: '5%',
            userSelect: 'none'
          }}
        >
          Filter
        </Typography>

        <Typography component="div"
          className='filter-item'
        >

          <Button
            size="small"
            sx={{
              width: 'auto',
              borderRadius: '16px',
              color: 'white',
              marginLeft: '5%',
              pointerEvents: "none",
              fontSize: '20px',
              fontWeight: '700',
            }}
          >
            Language
          </Button>
          <Box marginLeft={'2%'} display={'flex'} flexDirection={'column'} width={'100%'} flexWrap={'wrap'} fontSize={'18px'}>
            {languages.map((item, key) => {
              return (
                <div style={{ paddingLeft: '4%'}}>
                <div
                  className={item.active ? 'filter__btn--active' : 'filter__btn--deactive'}
                  onClick={() => {
                    setLanguages((prevItems) =>
                      prevItems.map((item, index) =>
                        index === key ? { ...item, active: !item.active } : item,
                      ),
                    );
                  }}
                >
                </div>
                <span style={{ color: 'white', margin:' 10px', position:'relative', bottom: '2px' }}>{item?.name}</span>
                </div>
              );
            })}
          </Box>
        </Typography>
        <Typography component="div"
          className='filter-item'
        >
          <Button
          size="small"
          sx={{
            width: 'auto',
            borderRadius: '16px',
            color: 'white',
            marginLeft: '4%',
            pointerEvents: "none",
            fontSize: '20px',
            fontWeight: '700',
          }}
            
          >
            Rating
          </Button>
          <Box marginLeft={'2%'} display={'flex'} flexDirection={'column'} width={'100%'} flexWrap={'wrap'} fontSize={'18px'}>
            {ratings.map((item, key) => {
              return (
                <div style={{ paddingLeft: '4%'}}>
                <div
                  className={item.active ? 'filter__btn--active' : 'filter__btn--deactive'}
                  variant="outlined"
                  key={key}
                  size="small"
                  sx={{
                    borderRadius: '16px',
                    color: 'black',
                    width: 'auto',
                    padding: '0.75em 1em',
                    margin: '6px 10px',
                    fontSize: '12px',
                  }}
                  endIcon={<StarRateIcon color={item.active ? "#fff" : "#0ab718"} />}
                  onClick={() => {
                    setRatings((prevItems) =>
                      prevItems.map((item, index) => ({
                        ...item,
                        active: index === key ? true : false,
                      })),
                    );
                  }}
                >
                </div>
                <span style={{ color: 'white', margin:' 10px', position:'relative', bottom: '2px' }}>{item?.name}</span>
                </div>
              );
            })}
          </Box>
        </Typography>
        
        <Typography component="div"
          className='filter-item'
        >

        </Typography>
        <Typography component="div"
          className='filter-item'
        >
          <Button
          size="small"
          sx={{
            width: 'auto',
            borderRadius: '16px',
            color: 'white',
            marginLeft: '5%',
            pointerEvents: "none",
            fontSize: '20px',
            fontWeight: '700',
          }}
          >
            Experience
          </Button>
          <Box marginLeft={'2%'} display={'flex'} flexDirection={'column'} width={'100%'} flexWrap={'wrap'} fontSize={'18px'}>
            {cookings.map((item, key) => {
              return (
                <div style={{ paddingLeft: '4%'}}>
                <div
                  className={item.active ? 'filter__btn--active' : 'filter__btn--deactive'}
                  variant="outlined"
                  size="small"
                  key={key}
                  sx={{
                    borderRadius: '16px',
                    color: 'black',
                    width: 'auto',
                    padding: '0.5em 1em',
                    margin: '6px 10px',
                    textTransform: 'none',
                  }}
                  onClick={() => {
                    setCookings((prevItems) =>
                      prevItems.map((item, index) => ({
                        ...item,
                        active: index === key ? true : false,
                      })),
                    );
                  }}
                >
                </div>
                <span style={{ color: 'white', margin:' 10px', position:'relative', bottom: '2px'}}>{item?.name}</span>
                </div>
              );
            })}
          </Box>
        </Typography>
        

        {/* <Typography component="div"
          className='filter-item'
        >
        <Button
          size="small"
          sx={{
            width: 'auto',
            borderRadius: '16px',
            color: 'white',
            marginLeft: '5%',
            pointerEvents: "none",
            fontSize: '10px',
            fontWeight: '700',
          }}
          >
            Address
          </Button>
        <Box marginLeft={'2%'} display={'flex'} flexDirection={'column'} width={'100%'} flexWrap={'wrap'} fontSize={'10px'}>
            {address.map((item, key) => {
              return (
                <div style={{ paddingLeft: '4%'}}>
                <div
                  className={item.active ? 'filter__btn--active' : 'filter__btn--deactive'}
                  variant="outlined"
                  size="small"
                  key={key}
                  sx={{
                    borderRadius: '16px',
                    color: 'black',
                    width: 'auto',
                    padding: '0.5em 1em',
                    margin: '6px 10px',
                    textTransform: 'none',
                  }}
                  onClick={() => {
                    setAddress((prevItems) =>
                      prevItems.map((item, index) => ({
                        ...item,
                        active: index === key ? true : false,
                      })),
                    );
                  }}
                >
                </div>
                <span style={{ color: 'white', margin:' 10px', position:'relative', bottom: '2px'}}>{item?.name}</span>
                </div>
              );
            })}
          </Box>
          <Button
          size="small"
          sx={{
            width: 'auto',
            borderRadius: '16px',
            color: 'white',
            marginLeft: '4%',
            pointerEvents: "none",
            fontSize: '10px',
            fontWeight: '700',
          }}
          >
            Price
          </Button>
          <Box sx={{ width: 400 , margin:'10px 15%', position:'relative', top:'6%'}}>
            <AirbnbSlider
              slots={{ thumb: AirbnbThumbComponent }}
              getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
              defaultValue={[300000, 1500000]}
              valueLabelDisplay='on'
              marks={marks}
              min={100000}
              max={2000000}
            />
          </Box>
        </Typography> */}

        

        <Typography component="div" sx={{ float: 'right', margin: '0px 30%',display: 'flex',
         justifyContent: 'space-between 100px' }}>
          <Button
            type='button'
            variant="contained"
            sx={{
              borderRadius: '20px',
              padding: '10px 30px',
              marginLeft: '20px',
              textTransform: 'none',
              backgroundColor: '#1547AA',
              fontWeight: '600',
              height: '30px',
              width:'150px',
              ':hover': { backgroundColor: '#1547AA', opacity: 0.85 }
            }}
            onClick={handleSubmitFilter}
          >
            Apply
          </Button>
          <Button
            type='button'
            onClick={() => {
              handleCancelFilter()
            }}
            variant="contained"
            sx={{
              borderRadius: '20px',
              padding: '10px 30px',
              backgroundColor: '#D1D1D1',
              border: 'none',
              ml: 4,
              textTransform: 'none',
              fontWeight: '600',
              color: '#1547AA',
              height: '30px',
              width:'150px',
              ':hover': { backgroundColor: '#D1D1D1' },
            }}
          >
            Cancel
          </Button>
        </Typography>
      </Box>

  )
}

export default NannyFilter