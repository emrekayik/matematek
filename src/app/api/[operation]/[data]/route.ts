import { NextRequest, NextResponse } from 'next/server';
import { simplify, evaluate, derivative, parse  } from 'mathjs';

export async function GET(request: NextRequest, { params }: { params: { operation: string, data: string } }) {
    const { operation, data: expression } = params;

    if (!expression) {
        return NextResponse.json({ error: 'Expression is required' }, { status: 400 });
    }

    try {
        let result;
        switch (operation) {
            case 'simplify':
                result = simplify(expression).toString();
                break;
            case 'evaluate':
                result = evaluate(expression);
                break;
            case 'turev':
            case 'derivate':
                let parses = parse(expression)
                result = derivative (parses,'x')
                break;

            default:
                return NextResponse.json({ error: 'Invalid operation' }, { status: 400 });
        }
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid expression', details: error.message }, { status: 400 });
    }
}
