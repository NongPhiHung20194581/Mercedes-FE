import React, { useEffect, useState } from 'react'
import Home from '../components/Home/Home'
import { getAllNanniesApi, matchingNannyApi } from '../api/home.api';
import { useDispatch, useSelector } from 'react-redux';
import { profileSelector } from '../redux/selector';
import { changeIsUpdate } from '../redux/slices/profile.slice';
import { childCare, cooking, language, price, rating } from '../constants/filter';
import { BOTH, CHILD_CARE, COOKING } from '../constants/profile';

const HomeContainer = () => {
    const [nannies, setNannies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [size, setSize] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [dataShow, setDataShow] = useState([]);

    // states for filter component
    const [languages, setLanguages] = useState(language);
    const [cookings, setCookings] = useState(cooking.slice(0, -1));
    const [childCares, setChildCares] = useState(childCare.slice(0, -1));
    const [prices, setPrices] = useState(price);
    const [ratings, setRatings] = useState(rating);

    const [isFilter, setIsFilter] = useState(false);

    const { isUpdated, data } = useSelector(profileSelector);
    const dispatch = useDispatch();

    const getAllNannies = () => {
        setIsLoading(true);
        getAllNanniesApi()
            .then(res => {
                const data = [...res.data.result.staffs];
                setIsLoading(false);
                setNannies(data);
            })
            .catch(err => {
                setIsLoading(false);
            })
    }

    const handleChangeIsFilter = () => {
        setIsFilter(!isFilter);
    }

    const handleCancelFilter = () => {
        setLanguages(language);
        setChildCares(childCare);
        setCookings(cooking);
        setPrices(price);
        setRatings(rating);
        handleChangeIsFilter();
        getAllNannies();
    }

    const handleChangeCurrentPage = page => {
        setCurrentPage(page);
    }

    const handleFilterFromProfile = (profile) => {
        const { nationality, want_to } = profile;
        let formData = {};
        formData.userLanguage = nationality;

        switch (want_to) {
            case CHILD_CARE:
                formData.careExp = childCare[1].value;
                break;
            case COOKING:
                formData.cookExp = cooking[1].value;
                break;
            case BOTH:
                formData.careExp = childCare[1].value;
                formData.cookExp = cooking[1].value;
                break;
            default:
        }

        setIsLoading(true)
        matchingNannyApi(formData)
            .then(res => {
                setNannies(res.data)
                setIsLoading(false);
                dispatch(changeIsUpdate(false));
            })
            .catch(err => {
                dispatch(changeIsUpdate(false));
            })
    };

    useEffect(() => {
        if (data && isUpdated) {
            handleFilterFromProfile(data);
        } else {
            getAllNannies();
        }
        //eslint-disable-next-line
    }, [data])

    useEffect(() => {
        const startIndex = (currentPage - 1) * size;
        const data = [...nannies].splice(startIndex, size);
        setTotalPages(Math.ceil(nannies.length / size))
        setDataShow(data);
    }, [nannies, currentPage, size])

    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages])

    useEffect(() => {
        const handleResize = () => {
            const numColumns = Math.floor((window.innerWidth - 180) / 315); // Số cột ước tính, 200px là kích thước ước lượng của StaffCard
            const numRows = 2; // Số hàng ước tính, 200px là kích thước ước lượng của StaffCard
            const maxItemsPerPage = numColumns * numRows;
            if (numColumns > 3) {
                setSize(maxItemsPerPage);
            } else {
                setSize(8)
            }
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [])

    return (
        <Home
            nannies={dataShow}
            setNannies={setNannies}
            isLoading={isLoading}
            currentPage={currentPage}
            totalPages={totalPages}
            handleChangeCurrentPage={handleChangeCurrentPage}
            isFilter={isFilter}
            setIsFilter={handleChangeIsFilter}
            handleCancelFilter={handleCancelFilter}
            setIsLoading={setIsLoading}
            setChildCares={setChildCares}
            setCookings={setCookings}
            setLanguages={setLanguages}
            setPrices={setPrices}
            setRatings={setRatings}
            childCares={childCares}
            cookings={cookings}
            languages={languages}
            prices={prices}
            ratings={ratings}
        />
    )
}

export default HomeContainer