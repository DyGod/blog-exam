import {useState, useEffect} from 'react';
import {Helmet} from "react-helmet";


import { Container, Row, Col, Form } from "react-bootstrap";

import PostPagination from './../../components/PostPagination';
import PostCard from './../../components/PostCard';
import Fetch from './../../store/Fetch';

import Loader from './../../components/Loader'

const Post = (props) => {

    const [loading, setLoading] = useState(true);
    const [recentPosts, setRecentPosts] = useState([]);
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");
    
    const [pageFilter, setPageFilter] = useState({
        current: 1,
        perPage: 8,
        total: 0
    });

    const handleCategory = (e) => {
        setCategory(e.target.value);
        setLoading(true);
    }
    const handleSort = (e) => {
        setSort(e.target.value);
        setLoading(true);
    }
    
    const jumpTo = (data) => {
        setPageFilter(data);
        setLoading(true);
    }

    useEffect(() => {
        setLoading(true);
        console.log("update q", props)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ props ]);

    useEffect(() => {
        if(loading){
            let filter = {
                q: props.q,
                category: category,
                sort: sort,
                current: pageFilter.current,
                perPage: pageFilter.perPage
            }
            Fetch.getPosts(filter).then( res => {
                setRecentPosts(res.data);
                setLoading(false);
                setPageFilter(res.pageFilter)
            });    
        }
        console.log('should update fetch')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ loading ]);


    return (
        <div>
            <Helmet>
                <title>All Posts | Lifestyle Blog</title>
            </Helmet>
            <Container>
                <Row>
                    <Col>
                        <h1>All Posts</h1>
                    </Col>
                    <Col>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Filter Category</Form.Label>
                                    <Form.Control as="select" custom  value={category} onChange={handleCategory}>
                                        <option value="">All</option>
                                        <option>Travel</option>
                                        <option>Business</option>
                                        <option>Food</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Sort By</Form.Label>
                                    <Form.Control as="select" custom value={sort} onChange={handleSort}>
                                        <option value="created_at,desc">Created Date DESC</option>
                                        <option value="created_at,asc">Created Date ASC</option>
                                        <option value="title,desc">Title DESC</option>
                                        <option value="title,asc">Title ASC</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                    </Col>
                </Row>

                <div className="position-relative">
                    <Loader show={loading} />
                    <Row>
                        {
                            recentPosts.map( (item, i) =>{
                                return <Col key={i} sm={12} md={6}> <PostCard post={item} /> </Col>
                            })
                        }
                    </Row>
                </div>

                
                <PostPagination filter={pageFilter} setFilter={jumpTo} />
            </Container>
        </div>
    );

}


export default Post;