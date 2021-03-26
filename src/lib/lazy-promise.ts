// lazy-promise evaluates the executor when awaited, rather than when initialize
// i.e. unless something awaits it (or adds a ".then(...)""), it doesn't run
export class LazyPromise<T> extends Promise<T> {
  private promise: Promise<T>

	constructor(private readonly executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason: any) => void) => void) {
		super(_ => {})
	}

	static from<TResult>(fn: () => TResult | PromiseLike<TResult>): LazyPromise<TResult> {
		return new LazyPromise<TResult>(resolve => resolve(fn()))
  }

	then<TResult1=T, TResult2=never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
  ): Promise<TResult1 | TResult2> {
    this.init()
		return this.promise.then(onfulfilled, onrejected)
	}

	catch<TResult=never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>{
		this.init()
		return this.promise.catch(onrejected)
	}

	private init() {
		this.promise = this.promise || new Promise(this.executor)
	}
}
