 import { db } from "@vercel/postgres";

 const client = await db.connect();

 async function listInvoices() {
 	const data = await client.sql`
     SELECT invoices.amount, customers.name
    FROM invoices
     JOIN customers ON invoices.customer_id = customers.id
     WHERE invoices.amount = 666;
   `;

	return data.rows;
}

export async function GET() {
  try {
    // Appel de la fonction listInvoices
    const invoices = await listInvoices();

    // Retourne une réponse avec les factures en JSON
    return new Response(
      JSON.stringify(invoices),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    // Retourne une réponse d'erreur en cas de problème
    return new Response(
      JSON.stringify({ error: error || 'An error occurred' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

