'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (sessionId) {
      // Here you would typically verify the payment with your backend
      // For now, we'll just simulate verification
      setIsVerified(true);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">お支払い完了！</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-gray-300">
            <p className="mb-2">c.ai+へのご登録ありがとうございます！</p>
            <p className="text-sm">
              月額サブスクリプションが正常にアクティベートされました。
            </p>
          </div>
          
          {sessionId && (
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-xs text-gray-400">セッションID:</p>
              <p className="text-sm text-white font-mono break-all">{sessionId}</p>
            </div>
          )}

          <div className="space-y-2 pt-4">
            <Link href="/" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Home className="w-4 h-4 mr-2" />
                ホームに戻る
              </Button>
            </Link>
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                チャットを開始
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}