import { NextResponse } from 'next/server';
import axios from 'axios';

const BILLZ_API_KEY = process.env.BILLZ_LOYALTY_API;

export async function POST(request) {
    try {
        // Проверка наличия API ключа
        if (!BILLZ_API_KEY) {
            console.error('BILLZ_LOYALTY_API is not configured in environment variables');
            return NextResponse.json(
                { success: false, message: 'server_configuration_error' },
                { status: 500 }
            );
        }

        const { phoneNumber } = await request.json();

        if (!phoneNumber) {
            return NextResponse.json(
                { success: false, message: 'Phone number is required' },
                { status: 400 }
            );
        }

        const requestData = {
            jsonrpc: '2.0',
            method: 'client.search',
            params: {
                phoneNumber: phoneNumber,
            },
            id: '1'
        };

        const response = await axios.post(
            'https://api.billz.uz/v1/',
            requestData,
            {
                headers: {
                    'Authorization': `Bearer ${BILLZ_API_KEY}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );

        if (response.data.result &&
            response.data.result.clients &&
            response.data.result.clients.length > 0) {
            const client = response.data.result.clients[0].client;

            if (client.balance && client.balance.Valid) {
                return NextResponse.json({
                    success: true,
                    data: {
                        points: client.balance.Float64,
                        cardNumber: client.cardNumbers && client.cardNumbers.trim() !== ''
                            ? client.cardNumbers
                            : phoneNumber
                    }
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'no_loyalty_card'
                }, { status: 404 });
            }
        } else {
            return NextResponse.json({
                success: false,
                message: 'client_not_found'
            }, { status: 404 });
        }
    } catch (error) {
        console.error('Billz API Error:', error);
        return NextResponse.json(
            { success: false, message: 'server_error' },
            { status: 500 }
        );
    }
}