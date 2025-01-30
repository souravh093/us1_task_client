import { z } from "zod";

const createSkillValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Skills name is required' }),
    description: z.string({ required_error: 'Skills description is required' }),
    category: z.enum(
      [
        'PROGRAMMING',
        'DESIGN',
        'MARKETING',
        'BUSINESS',
        'MUSIC',
        'PHOTOGRAPHY',
        'VIDEOGRAPHY',
        'WRITING',
        'COOKING',
        'LANGUAGE',
        'FITNESS',
        'OTHER',
      ],
      { required_error: 'Skills category is required' },
    ),
    image: z
      .string({ required_error: 'Skills image is required' })
      .url({ message: 'Invalid URL' }),
    level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], {
      required_error: 'Skills level is required',
    }),
    userId: z.string({ required_error: 'User ID is required' }),
    availabilities: z.array(
      z.object({
        dayOfWeek: z.enum([
          'SUNDAY',
          'MONDAY',
          'TUESDAY',
          'WEDNESDAY',
          'THURSDAY',
          'FRIDAY',
          'SATURDAY',
        ], { required_error: 'Day of week is required' }),
        status: z.enum(['AVAILABLE', 'UNAVAILABLE'], { required_error: 'Status is required' }).default('AVAILABLE'),
        startTime: z.string({ required_error: 'Start time is required' }),
        endTime: z.string({ required_error: 'End time is required' }),
      })
    ).optional(),
  }),
});

export { createSkillValidationSchema };