import { Sequelize } from "sequelize";



const seeders:any = {
    user: (instance: Sequelize) => {
      return instance.getQueryInterface().bulkInsert('Users',SEED_DATA.users)
    },
    category: (instance: Sequelize) => {
       return instance.getQueryInterface().bulkInsert('Categories', SEED_DATA.category)
    }
}


export const runSeeders = (instance: Sequelize, key: any) => {

    if(!key) {
        return Promise.reject('No key found')
    }

    if(key === 'ALL') {
        const p: any[] = [];
        const dataKeys:any = Object.keys(seeders);
        for(const d of dataKeys) {
            p.push(seeders[d](instance))
        }

       return  Promise.all(p);
    }

    return seeders[key](instance)
}





