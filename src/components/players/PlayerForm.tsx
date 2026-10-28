'use client';

import { useState } from 'react';
import { useForm, useFieldArray, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, Upload, User, Users } from 'lucide-react';
import { FutsalPosition, GuardianRelationship } from '@/types/database';
import { createPlayerWithGuardians } from '@/actions/players';
import { cn } from '@/lib/utils';

const futsalPositions: FutsalPosition[] = ['Píot', 'Ala', 'Cierre', 'Guardameta'];
const relationships: GuardianRelationship[] = ['Papa', 'Mama', 'Tutor', 'Otro'];
const preferredFeet = [
  { value: 'derecho', label: 'Derecho' },
  { value: 'izquierdo', label: 'Izquierdo' },
  { value: 'ambidiestro', label: 'Ambidiestro' },
] as const;

const guardianSchema = z.object({
  first_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  last_name: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  identification_number: z.string().min(5, 'Cédula/Identificación requerida'),
  phone_number: z.string().min(8, 'Teléfono requerido'),
  relationship: z.enum(['Papa', 'Mama', 'Tutor', 'Otro']),
  is_primary_contact: z.boolean().optional(),
});

const playerSchema = z.object({
  first_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  last_name: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  identification_number: z.string().optional(),
  birth_date: z.string().min(1, 'Fecha de nacimiento requerida'),
  jersey_number: z.union([z.coerce.number().int().positive(), z.literal('')]).optional(),
  preferred_foot: z.enum(['derecho', 'izquierdo', 'ambidiestro']).optional(),
  position: z.enum(['Píot', 'Ala', 'Cierre', 'Guardameta']).optional(),
  category_id: z.string().min(1, 'Seleccione una categoría'),
  photo_url: z.string().optional(),
  guardians: z.array(guardianSchema).min(1, 'Debe agregar al menos un representante'),
});

type PlayerFormData = z.infer<typeof playerSchema>;

interface CategoryOption {
  id: string;
  name: string;
  min_birth_year: number;
  max_birth_year: number;
}

interface PlayerFormProps {
  academyId: string;
  categories: CategoryOption[];
  onSuccess?: () => void;
}

export default function PlayerForm({ academyId, categories, onSuccess }: PlayerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PlayerFormData>({
    resolver: zodResolver(playerSchema) as Resolver<PlayerFormData>,
    defaultValues: {
      guardians: [{ relationship: 'Papa', is_primary_contact: true, first_name: '', last_name: '', identification_number: '', phone_number: '' }],
      jersey_number: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'guardians',
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setValue('photo_url', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: PlayerFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createPlayerWithGuardians({
        academy_id: academyId,
        category_id: data.category_id,
        first_name: data.first_name,
        last_name: data.last_name,
        identification_number: data.identification_number || undefined,
        birth_date: data.birth_date,
        jersey_number: data.jersey_number === '' || data.jersey_number === undefined ? undefined : Number(data.jersey_number),
        preferred_foot: data.preferred_foot,
        position: data.position,
        photo_url: data.photo_url,
        guardians: data.guardians,
      });

      if (result.success) {
        onSuccess?.();
      } else {
        setError(result.error || 'Error al registrar jugador');
      }
    } catch (err) {
      setError('Error inesperado al registrar jugador');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800 border border-red-200">
          {error}
        </div>
      )}

      <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Datos del Atleta</h2>
          </div>
        </div>
        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">Foto del jugador</label>
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-gray-200 bg-gray-100">
                {photoPreview ? (
                  <img src={photoPreview} alt="Vista previa" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <User className="h-10 w-10 text-gray-400" />
                  </div>
                )}
              </div>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50">
                <Upload className="h-4 w-4" />
                Subir imagen
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Nombres *</label>
            <input
              {...register('first_name')}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Ej. Juan Carlos"
            />
            {errors.first_name && <p className="mt-1 text-xs text-red-600">{errors.first_name.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Apellidos *</label>
            <input
              {...register('last_name')}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Ej. Pérez Gómez"
            />
            {errors.last_name && <p className="mt-1 text-xs text-red-600">{errors.last_name.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Cédula / Partida de nacimiento</label>
            <input
              {...register('identification_number')}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Ej. 1234567890"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Fecha de nacimiento *</label>
            <input
              type="date"
              {...register('birth_date')}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.birth_date && <p className="mt-1 text-xs text-red-600">{errors.birth_date.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Categoría *</label>
            <select
              {...register('category_id')}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.min_birth_year} - {cat.max_birth_year})
                </option>
              ))}
            </select>
            {errors.category_id && <p className="mt-1 text-xs text-red-600">{errors.category_id.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Posición de Futsal</label>
            <select
              {...register('position')}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Sin asignar</option>
              {futsalPositions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Número de camiseta</label>
            <input
              type="number"
              {...register('jersey_number')}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Ej. 10"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Pie preferido</label>
            <select
              {...register('preferred_foot')}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Sin especificar</option>
              {preferredFeet.map((foot) => (
                <option key={foot.value} value={foot.value}>
                  {foot.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Núcleo Familiar</h2>
            </div>
            <button
              type="button"
              onClick={() => append({ relationship: 'Mama', is_primary_contact: false, first_name: '', last_name: '', identification_number: '', phone_number: '' })}
              className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
            >
              <Plus className="h-4 w-4" />
              Agregar representante
            </button>
          </div>
        </div>
        <div className="space-y-6 p-6">
          {fields.map((field, index) => (
            <div key={field.id} className="rounded-lg border border-gray-200 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Representante {index + 1}</h3>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="flex items-center gap-1 text-sm text-red-600 transition hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                  </button>
                )}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Parentesco *</label>
                  <select
                    {...register(`guardians.${index}.relationship`)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {relationships.map((rel) => (
                      <option key={rel} value={rel}>
                        {rel}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 md:pt-6">
                  <input
                    type="checkbox"
                    {...register(`guardians.${index}.is_primary_contact`)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="text-sm text-gray-700">Contacto principal</label>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Nombres *</label>
                  <input
                    {...register(`guardians.${index}.first_name`)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.guardians?.[index]?.first_name && (
                    <p className="mt-1 text-xs text-red-600">{errors.guardians[index]?.first_name?.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Apellidos *</label>
                  <input
                    {...register(`guardians.${index}.last_name`)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.guardians?.[index]?.last_name && (
                    <p className="mt-1 text-xs text-red-600">{errors.guardians[index]?.last_name?.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Cédula/Identificación *</label>
                  <input
                    {...register(`guardians.${index}.identification_number`)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.guardians?.[index]?.identification_number && (
                    <p className="mt-1 text-xs text-red-600">{errors.guardians[index]?.identification_number?.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Teléfono *</label>
                  <input
                    {...register(`guardians.${index}.phone_number`)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.guardians?.[index]?.phone_number && (
                    <p className="mt-1 text-xs text-red-600">{errors.guardians[index]?.phone_number?.message}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {errors.guardians && typeof errors.guardians.message === 'string' && (
            <p className="text-xs text-red-600">{errors.guardians.message}</p>
          )}
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700',
            isSubmitting && 'cursor-not-allowed opacity-60'
          )}
        >
          {isSubmitting ? 'Guardando...' : 'Registrar Jugador'}
        </button>
      </div>
    </form>
  );
}
