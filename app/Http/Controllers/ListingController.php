<?php

namespace App\Http\Controllers;

use Exception;
use Housemates\ConnectApi\ApiClient;

class ListingController extends Controller
{
    public function __invoke(string $roomId)
    {
        /** @var ApiClient $apiClient */
        $apiClient = app('apiClient');

        try {
            $response = $apiClient->getRoom($roomId)->jsonSerialize();
            $responseArray = json_decode(json_encode($response), true);

            return inertia('Listing/index', [
                'room' => $responseArray,
            ]);
        } catch (Exception $e) {
            return redirect()->route('home.index');
        }
    }
}
