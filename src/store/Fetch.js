let base_url = "http://blog-api.markdylan.tech/api/";
let headers = {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json',
    'mode': 'no-cors'
};
const Fetch = {
    
    getPostById : (id = 0 ) => {
        let options = {
            method: 'GET',
            headers : headers
        };
        return new Promise(( resolve, reject ) => {
            fetch(base_url + "post/get/" + id, options)
            .then( response => {
                resolve( response.json() )
            })
            .catch( error => {
                reject( error )
            })
        })
    },
    getPostBySlug : (slug = "" ) => {
        let options = {
            method: 'GET',
            headers : headers
        };
        return new Promise(( resolve, reject ) => {
            fetch(base_url + "post/getBySlug/" + slug, options)
            .then( response => {
                resolve( response.json() )
            })
            .catch( error => {
                reject( error )
            })
        })
    },
    getPosts: (filter = {}) => {
        let options = {
            method: 'POST',
            headers : headers,
            body: JSON.stringify(filter)
        }
        return new Promise(( resolve, reject ) => {
            fetch(base_url + "post/get", options)
            .then( response => {
                resolve( response.json() )
            })
            .catch( error => {
                reject( error )
            })
        })
    },
    storePost: (data) => {
        let options = {
            method: 'POST',
            headers : headers,
            body: JSON.stringify(data)
        }
        return new Promise(( resolve, reject ) => {
            fetch(base_url + "post/store", options)
            .then( response => {
                resolve( response.json() )
            })
            .catch( error => {
                reject( error )
            })
        })
    },
    deletePost: (id) => {
        let options = {
            method: 'GET',
            headers : headers
        };
        return new Promise(( resolve, reject ) => {
            fetch(base_url + "post/delete/" + id, options)
            .then( response => {
                resolve( response.json() )
            })
            .catch( error => {
                reject( error )
            })
        })
    }
};

export default Fetch;

