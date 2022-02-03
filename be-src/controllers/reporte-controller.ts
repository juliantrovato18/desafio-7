import { Reporte } from "../models";

 export async function createReport(reportData, userId){
    const report = await Reporte.findOrCreate({
        where:{
            user_id:userId,
        },
        defaults:{
            name: reportData.name,
            phoneNumber: reportData.phoneNumber,
            when: reportData.when
        }
          
    })

        return report;
 }