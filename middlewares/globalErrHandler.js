export const globslErrHandler = (err , req , res , next) => {
    // we want to be aware of errors and we need a stack to store them in || means witch line of code give specific error

    const stack = err.stack;
    const statusCode = err.statusCode ? err.statusCode : 500 ;
    const message = err.message;


    res.status(statusCode).json({
        stack,
       
        message,

        
    })
}; // any time this middleware called we exite and shoudnt go to next middleware on the pipeline(app.use('/' , userRoutes))


//404 handler

export const notFound = (req , res , next) => {
    const err = new Error(`Route ${req.originalUrl} not found`); // construct new custom err message || originalUrl is what user try yo access
    next(err);
}; // but here if we go to next 