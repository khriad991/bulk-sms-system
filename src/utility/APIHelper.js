class APIHelper {

    async Login(obj) {
        try {
            const response = await fetch("/api/user/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });

            return response.json()
        } catch (e) {
            return false
        }
    }


    async Create(api, obj) {
        try {
            const response = await fetch(api, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });

            return response.json()
        } catch (e) {
            return false
        }
    }
    async Get(api) {
        try {
            const response = await fetch(api);
            return response.json()
        } catch (e) {
            return false
        }
    }
    async Update(api, obj) {
        try {
            const response = await fetch(api, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });

            return response.json()
        } catch (e) {
            return false
        }
    }
    async Delete(api) {
        try {
            const response = await fetch(api, {
                method: "DELETE",
            });

            return true
        } catch (e) {
            return false
        }
    }



}

export  const {Login,Create,Get,Update,Delete} = new APIHelper()
