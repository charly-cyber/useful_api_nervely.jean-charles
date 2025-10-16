<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
class CheckModuleActive
{
    /**
     * Gère une requête entrante.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string|null  ...$modules
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next, ...$modules): Response
    {
        if (! Auth::check()) {
            return response()->json(['message' => 'Non authentifié.'], 401);
        }


        $user = Auth::user();

        $userModules = $user->activeModules()->pluck('name')->toArray();
        // Parcourir les modules nécessaires à la route
        foreach ($modules as $module) {
            if (! in_array($module, $userModules)) {
                return response()->json(['message' => "Accès refusé. Le module '{$module}' n'est pas actif."], 403);
            }
        }

        return $next($request);
    }
}
