global.foo = "name";
console.log(process.argv);
process.nextTick(function () {
	console.log("NextTick callback");
});
