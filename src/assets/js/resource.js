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
let deleteBrand = '/brand/delete?brandId={brandId}&userId={userId}'

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

//删除用户意向门店,Delete
let deleteIntentionStore = '/store/intention/delete?storeId={storeId}&userId={userId}'

//上传固定格式的已开店铺列表csv文件,Post
let uploadExistedStores = '/store/existed/upload?brandId={brandId}&userId={userId}'

/*start 右侧面板*/
//周总客流、月总客流
const passengerSum = '/passenger/sum';
//周平均客流、月平均客流
const passengerAvgHourly = '/passenger/avg/hourly';
//周每日、月每日
const passengerDaily = '/passenger/daily';
//人口画像
const passengerLabelData = '/label/passenger';
//人口分析|区域总人口、居住人口、工作人口
const populationSummary = '/population/summary';
//人口画像
const populationLabelData = '/label/population';
//竞品列表
const peripheryCompetitive = '/periphery/competitive/list';
//区域周边配套设施
const peripheryFacilities = '/periphery/facilities';

/*end 右侧面板*/
export default {
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
    intentionStoresSummary,
    deleteIntentionStore,
    uploadExistedStores,
    passengerSum,
    passengerAvgHourly,
    passengerDaily,
    passengerLabelData,
    populationSummary,
    populationLabelData,
    peripheryCompetitive,
    peripheryFacilities
}
