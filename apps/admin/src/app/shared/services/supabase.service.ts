import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase = createClient(
    'https://fvjchziwkfxkgdjqybjg.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2amNoeml3a2Z4a2dkanF5YmpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE5MDg3OTUsImV4cCI6MjAwNzQ4NDc5NX0.DzSuI5wgROUd3T7j6rWYWmhb1W45FXSeGH4TmUo0GOI'
  );

  uploadFile(file: any) {
    this.supabase.storage
      .from('itemImages')
      .upload(file.name || `${new Date()}-image.png`, file, {
        cacheControl: '3600',
        upsert: false,
      });
  }
}
