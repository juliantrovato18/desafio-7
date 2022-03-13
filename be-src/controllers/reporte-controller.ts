import { Reporte } from "../models";

 export async function createReport(reportData, userId){
    const report = await Reporte.create({
            name: reportData.name,
            phoneNumber: reportData.phoneNumber,
            when: reportData.when,
            user_id : userId    
    })

        return report;
 }