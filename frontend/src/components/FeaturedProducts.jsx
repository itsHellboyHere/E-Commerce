
import FeaturesGrid from "./FeaturesGrid"
import  ProductsGrid  from "./ProductsGrid"
import SectionTitle from "./SectionTitle"

const FeaturedProducts = () => {
  return (
    <div className=" align-element pt-24 ">
        <SectionTitle text='Featured products'/>
        <FeaturesGrid />
    </div>
  )
}
export default FeaturedProducts