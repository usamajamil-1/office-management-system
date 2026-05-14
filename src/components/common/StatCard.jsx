import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'

const StatCard = ({ title, value, icon: Icon, iconBg = 'bg-blue-50',
    iconColor = 'text-blue-500', trend}) => {
    const isUp = trend > 0
    return (
        <div>

            <Card className='hover:shadow-md transition-shadow duration-200'>
                <CardContent className="p-5" >
                    <div  className="flex justify-between items-center mb-3">
                        <div  className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
                            {Icon && <Icon size={18} className={iconColor} />}

                        </div>
                        {trend && (
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                                {trend > 0 ? '+' : ''}{trend}%
                            </span>
                        )}
                    </div>
                    <p  className="text-2xl font-bold text-gray-900">{value}</p>
                    <p className="text-xs text-gray-500 mt-1">{title}</p>
                </CardContent>
            </Card>

        </div>
    )
}

export default StatCard