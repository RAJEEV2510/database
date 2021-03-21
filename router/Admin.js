const AdminBro=require('admin-bro');
const AdminBroExpress=require('admin-bro-expressjs')
const AdminBroMongoose=require('admin-bro-mongoose')
const mongoose=require('mongoose')
AdminBro.registerAdapter(AdminBroMongoose)

const adminBro=new AdminBro({
    databases:[mongoose],
    rootPath:'/admin',
})

const Admin = {
    email:"rajeevupadhyay608@gmail.com",
    password:"rajeevkumar"
}

const router=AdminBroExpress.buildAuthenticatedRouter(adminBro,{
    cookieName:"admin-bro",
    cookiePassword:"admin-bro",
    authenticate:async (email ,password)=>{ 

        if(email==Admin.email && password==Admin.password)
        {
                return Admin
        }
        else
        {
            return null
        }

    }

})
module.exports=router