import React, { useState, useEffect } from 'react';
import { getCategories, getFilteredProducts } from './componentApi';
import { Container, Row, Col } from 'react-bootstrap';
import Checkbox from './CheckBox';
import RadioBox from './RadioBox';
import { prices } from './fixedPrices';
import ProductCard from './ProductCard';
import Footer from './Footer';

function Shop(props) {

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-success my-3">
                    Load more
                </button>
            )
        );
    };



    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);


    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };


    return (
        <>
            <Container fluid className="my-5 py-1 text-center">
        
            <h3 className="my-3 text-center">Get your Dream Boot</h3>
            
            <Row className="mx-3 my-4">
            
              <Col lg={2}>
                <div className="mb-3 text-left">
                   <h6>Filter by category</h6>
                <Checkbox 
                   categories={categories}
                   handleFilters={filters =>
                    handleFilters(filters, "category")}
                   />
                </div>

                <div className="mb-3 text-left">
                   <h6>Filter by price range</h6>
                <RadioBox 
                   prices={prices}
                   handleFilters={filters =>
                    handleFilters(filters, "price")}
                   />
               </div>
              </Col>

              <Col lg={10}>
                <Row className="justify-content-center">
                 {filteredResults.map((product, i) => (
                    <ProductCard key={i} product={product}/>
                 ))}
                </Row>
                {loadMoreButton()}
              </Col>

            </Row>
        </Container>
            <Footer/>
        </>
    );
}

export default Shop;