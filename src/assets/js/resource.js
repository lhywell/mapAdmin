//获取自建品牌基本信息,Get
let brandInfo = '/brand/info?brandId={brandId}'

//获取用户自建品牌列表,Get
let brandList = '/brand/list?userId={userId}'

//获取品牌关系列表,Get
let brandRelation = 'brand/relation?brandId={brandId}&category={category}'

//用户创建自有品牌接口,Post
let createBrand = '/brand/create'

//创建增益品牌或者竞品品牌,Post
let createBrandRelation = '/brand/relation/create'

//删除用户自建品牌,delete
let deleteBrand	= '/brand/delete?brandId={brandId}&userId={userId}'

//删除某品牌的关系品牌,delete
let deleteBrandRelation = '/brand/relation/delete?relationId={relationId}&userId={userId}'

//获取TD定义的标准品牌列表，可以用于创建品牌时的索引，和创建增益品牌竞品时的多选,Get
let standardBrandList = '/standardBrand/list'

//用户登录接口,根据手机号或邮箱+密码的方式登入系统,Post
let userLogin = '/user/login'

//获取某品牌下的已开店铺列表,Get
let existedStores = '/store/existed/list?brandId={brandId}'

//获取某品牌下的已开店铺数据概览,Get
let existedStoresSummary = '/store/existed/summary?brandId={brandId}'

//获取某品牌下的意向店铺列表,Get
let intentionStores = '/store/intention/list?brandId={brandId}'

//获取某品牌下的意向店铺概览数据,Get
let intentionStoresSummary = '/store/intention/summary?brandId={brandId}'

export default{
	brandInfo,
	brandList,
	brandRelation,
	createBrand,
	createBrandRelation,
	deleteBrand,
	deleteBrandRelation,
	standardBrandList,
	userLogin,
	existedStores,
	existedStoresSummary,
	intentionStores,
	intentionStoresSummary
}