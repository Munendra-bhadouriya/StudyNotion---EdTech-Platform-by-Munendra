const Category = require("../models/Category");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

exports.createCategory = async (req, res) => {
    try {
        //fetch info from the req body
        const { name, description } = req.body;

        //validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are necessary.",
            });
        }

        //create entry in DB
        const CategorysDetails = await Category.create({
            name: name,
            description: description,
        });

        console.log(CategorysDetails);

        //return response
        return res.status(200).json({
            success: true,
            message: "Categorys created successfully.",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//get all tags 
exports.showAllCategories = async (req, res) => {
    try {
        const allCategorys = await Category.find({});
        return res.status(200).json({
            success: true,
            message: "All categories are returned successfully.",
            data: allCategorys,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


//category page details
exports.categoryPageDetails = async (req, res) => {
    try {
        //fecth category id
        const { categoryId } = req.body;

        //get courses for specified category id
        const selectedCategory = await Category.findById(categoryId)
        .populate({
            path: "courses",
            match: { status: "Published" },
            populate: [
                { path: "ratingAndReviews" },
                { path: "instructor" }
            ]
        })
        .exec();                                 
        //validation
        if (!selectedCategory) {
            return res.status(404).josn({
                success: false,
                message: 'Data not found',
            });
        }

        // Handle the case when there are no courses
        if (selectedCategory.courses.length === 0) {
            console.log("No courses found for the selected category.")
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            })
        }


        //get course for different categories
        const categoriesExceptSelected = await Category.find({ _id: { $ne: categoryId } });
        
        let differentCategories = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
        )
        .populate({
            path: "courses",
            match: { status: "Published" },
        }).exec();

        //hw get top 10 most selling courses
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: "Published",
                populate: "instructor",
            }).exec();
        
        const allCourses = allCategories.flatMap((category) => category.courses);
        const mostSellingCourses = allCourses.sort((a, b) => (a.studentsEnrolled || 0) - (a.studentsEnrolled || 0)).slice(0, 10);

        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories,
                mostSellingCourses,
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

