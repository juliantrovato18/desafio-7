
import algoliasearch from 'algoliasearch';



const client = algoliasearch('IDYAQ7IUHB', 'f87c1473916c1dcc03867808d06cf67c');
 const index = client.initIndex('pets');

 export {index}