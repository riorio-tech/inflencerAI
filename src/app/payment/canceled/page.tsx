'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PaymentCanceled() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
            <XCircle className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">お支払いキャンセル</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-gray-300">
            <p className="mb-2">お支払いがキャンセルされました。</p>
            <p className="text-sm">
              アカウントへの請求は行われていません。いつでも再度お試しいただけます。
            </p>
          </div>

          <div className="space-y-2 pt-4">
            <Link href="/" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Home className="w-4 h-4 mr-2" />
                ホームに戻る
              </Button>
            </Link>
            <Button 
              onClick={() => window.history.back()}
              variant="outline" 
              className="w-full border-gray-600 text-white hover:bg-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              戻る
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}