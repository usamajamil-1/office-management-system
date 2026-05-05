import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

const StatCard = ({ title, value }) => {
    return (
        <div>

            <Card className='flex flex-col w-44 shadow-md'>
                <CardHeader>
                    <CardTitle className="text-sm text-gray-500" >{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-bold">{value}</CardContent>
            </Card>

        </div>
    )
}

export default StatCard