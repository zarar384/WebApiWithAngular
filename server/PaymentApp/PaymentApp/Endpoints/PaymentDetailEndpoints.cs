using Microsoft.EntityFrameworkCore;
using PaymentApp.Data;
using PaymentApp.Models;

namespace PaymentApp.Endpoints
{
    public static class PaymentDetailEndpoints
    {
        public static void MapPaymentDetailEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("/api/PaymentDetail");

            // GET
            group.MapGet("/", async (AppDbContext db) =>
                await db.PaymentDetails.ToListAsync());

            // POST
            group.MapPost("/", async (AppDbContext db, PaymentDetail model) =>
            {
                db.PaymentDetails.Add(model);
                await db.SaveChangesAsync();
                return Results.Ok(model);
            });

            // PUT
            group.MapPut("/{id}", async (int id, AppDbContext db, PaymentDetail updated) =>
            {
                var item = await db.PaymentDetails.FindAsync(id);
                if (item is null) return Results.NotFound();

                item.CardOwnerName = updated.CardOwnerName;
                item.CardNumber = updated.CardNumber;
                item.ExpirationDate = updated.ExpirationDate;
                item.SecurityCode = updated.SecurityCode;

                await db.SaveChangesAsync();
                return Results.Ok(item);
            });

            // DELETE
            group.MapDelete("/{id}", async (int id, AppDbContext db) =>
            {
                var item = await db.PaymentDetails.FindAsync(id);
                if (item is null) return Results.NotFound();

                db.PaymentDetails.Remove(item);
                await db.SaveChangesAsync();
                return Results.Ok();
            });
        }
    }
}
