import dotenv from "dotenv";
dotenv.config();

interface userData  {
	name: string | null
	email: string | null
	roleId: string | null
	verified: boolean | null
	active:boolean | null
}

const responseData = (status: number, message: string | null, error:any | null, data: any | null) => {
    if (error != null && error instanceof Error) {
        const response = {
            status: status,
            message: message,
            errors: error,
            data: null
        }
        return response;
    }
    const res = {
        status,
        message,
        errors: error,
        data: data,
    }
    return res;
};

export default { responseData }