import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeScore,
    save
}

window.userService = userService


async function getUsers() {
    // return storageService.query('user')
    return await httpService.get(`user`)
}

async function save(user) {
    const savedUser = await httpService.put(`user/${user._id}`, user)
    return savedUser
}


async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
    const user = await storageService.get('user', _id)
    user.score = score
    await storageService.put('user', user)

    // const user = await httpService.put(`user/${_id}`, {_id, score})
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    try {
        userCred.password = '123'
        const user = await httpService.post('auth/login', userCred)
        return saveLocalUser(user)
    } catch (err) {
        throw err
    }

    // const users = await storageService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    // // const user = await httpService.post('auth/login', userCred)
    // if (user) {
    // }
}
async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    userCred.stations = [{
        _id: utilService.makeId(),
        name: 'Liked Song',
        imgUrl: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
        songs: []
    }]
    // const user = await storageService.post('user', userCred)
    try{
    const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
    }catch {
        console.log('can not signup');
    }
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function saveLocalUser(user) {
    user = { _id: user._id, username: user.username, imgUrl: user.imgUrl, stations: user.stations }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()



