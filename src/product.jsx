function Product ({title,ver,feat}) {
   return ( 
    <div>
    <p><strong>Product title is : </strong> {title} </p>
   <p> Product 1st version is  :  {ver[0]}. 2nd version is {ver[1]} , 3rd version is {ver[2]} </p>
   <p> prodcut features milage is {feat.milage} speed {feat.speed} power is {feat.power}</p>
   </div>

   );
}
export default Product;