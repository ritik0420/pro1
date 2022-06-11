import React, { useState, useEffect } from 'react';
import { getCategories, list } from './componentApi';
import { Container, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';

function SearchBar(props) {

    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    });

    const {categories, category, search, results, searched} = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({ ...data, categories: data });
            }
        });
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const searchData = () => {
        // console.log(search, category);
        if (search) {
            list({ search: search || undefined, category: category }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }
    };

    const searchSubmit = e => {
        e.preventDefault();
        searchData();
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`;
        }
        if (searched && results.length < 1) {
            return `No products found`;
        }
    };

    const searchedProducts = (results = []) => {
        return (
            <div>
                <h4 className="text-center my-4">
                    {searchMessage(searched, results)}
                </h4>

                <Row className="justify-content-center">
                    {results.map((product, i) => (
                    <ProductCard key={i} product={product} />    
                    ))}
                </Row>
            </div>
        );
    };
    

    return (
        <Container fluid>
            <form onSubmit={searchSubmit} className="my-3">
              <span className="input-group-text">
                <div className="input-group input-group-md">

                  <div className="input-group-prepend">
                    <select className="btn btn-sm mr-2" onChange={handleChange('category')}>
                      <option value="All">All</option>
                      {categories.map((c, i) => (
                          <option key={i} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <input
                    type="search"
                    className="form-control"
                    onChange={handleChange('search')}
                    placeholder="Search..."
                    />

                   <button className="input-group-text input-group-append">Search</button>

                </div>
              </span>
            </form>

            <Container fluid className="my-4">
              {searchedProducts(results)}
           </Container>

        </Container>
    );
}

export default SearchBar;