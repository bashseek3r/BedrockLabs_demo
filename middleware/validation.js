exports.validateAppointment = (req, res, next) => {

    const { name, phone } = req.body;

    if (!name || !phone) {

        return res.status(400).json({

            success: false,

            message: "Please complete all required fields."

        });

    }

    next();

};

